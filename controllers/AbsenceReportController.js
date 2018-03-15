const mongoose = require('mongoose')
const AbsenceReport = mongoose.model('AbsenceReport')
const mail = require('../handlers/mail')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')
const moment = require('moment')
const fs = require('fs')
const axios = require('axios')
const slack = require('slack')

// Display the list of the reports
exports.list = async (request, response) => {
  let query = {}

  if (request.user.role === 'student')  {
    query = {
      user: request.user._id
    }
  }

  const reports = await AbsenceReport.find(query)
    .sort({ 'date_created': -1 })
    .populate('user')

  response.render('admin/absence-reports/reportList', {
    title: 'Absence Reports',
    reports
  })
 }

// Display the form to add a report
exports.reportForm = async (request, response) => {
  response.render('admin/absence-reports/reportForm', {
    title: 'New Absence Report'
  })
}

// Uploading attachment and filtering by type
const storage = multer.diskStorage({
  destination: function(request, file, next) {
    next(null, './temp')
  },
  filename: function(request, file, next) {
    next(null, uuid(4))
  }
})

exports.upload = multer({
  storage,
  limits: {
    fileSize: 10000000, // 10 MB
  },
  fileFilter(request, file, next) {
    if(file.mimetype.startsWith('image/') || file.mimetype.search('pdf') !== -1) {
      next(null, true)
    } else {
      next({code: 'FILETYPE_NOT_ALLOWED', message: 'That filetype is not allowed!'}, false)
    }
  }
})
.single('attachment')

// Upload error handling
exports.uploadError = function(error, request, response, next) {
  if (error) {
    let message = 'Error during file upload. Please try again later.'

    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'The file is too large. Max. 10 MB allowed!'
        break;

      case 'FILETYPE_NOT_ALLOWED':
        message = 'The file type is not allowed. Only images and PDF!'
        break;
    }

    request.flash('danger', message)
    return response.redirect('back')
  }

  next()
}

// Successfull upload handling and file movement
exports.uploadSuccess = function(request, response, next) {
  if (!request.file) {
    return next()
  }

  try {
    const extension = request.file.mimetype.split('/')[1]
    const pathTemp = `./temp/${request.file.filename}`
    const filename = `${request.file.filename}.${extension}`
    const path = `./public/uploads/absence-reports/${filename}`

    fs.renameSync(pathTemp, path)

    request.body.attachment = {
      mimetype: request.file.mimetype,
      filename
    }
  } catch (error) {
    return next(new Error('The file upload failed!'))
  }
  
  next()
}

// Validate data and save the report
exports.createReport = async (request, response, next) => {
  request.body.user = request.user._id;

  const report = await (new AbsenceReport(request.body)).save();

  if(!report){
    request.flash('danger', `The report could not be saved. Please try again later.`);
    return response.redirect(`/admin/absence-reports/add`);
  }

  try {
    const dateNow = moment().format('YYYY-MM-DD HH:mm')
    let attachmentUrl = null

    if (report.attachment) {
      attachmentUrl = `${request.secure ? 'https://' : 'http://'}${request.headers.host}/uploads/absence-reports/${report.attachment.filename}`
    }

    const slackMessage =  axios.post('https://slack.com/api/chat.postMessage', {
                            token: process.env.SLACK_TOKEN,
                            channel: process.env.SLACK_CHANNEL,
                            text: request.body.message,
                            username: request.user.first_name,
                            pretty: 1
                          })

    const sendMail = mail.send({
                      filename: 'absence-report',
                      subject: `Absence Report of ${request.user.first_name} ${request.user.last_name} - ${dateNow}`,
                      to: ['dominik.hanke@devugees.org', 'carl.neuberger@devugees.org'],
                      report, attachmentUrl, user: request.user, moment
                    })
    
    Promise.all([sendMail, slackMessage])
      .catch((error) => {
        console.log(error)
        throw error
      })

  } catch (error) {
    report.remove()
    request.flash('danger', 'The report could not be send. Please try again later.')
    return response.redirect('back')
  }
  
  request.flash('success', `Successfully send your report.`);
  return response.redirect(`/admin/absence-reports/`);
}


