const mongoose = require('mongoose')
const AbsenceReport = mongoose.model('AbsenceReport')
const mail = require('../handlers/mail')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')
const moment = require('moment')

// Uploading image and filtering by type
exports.upload = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    if(file.mimetype.startsWith('image/')) {
      next(null, true)
    } else {
      next({ message: `That filetype isn't allowed!` }, false)
    }
  }
})
.single('photo')

// Resizing the uploaded image
exports.resize = async (request, response, next) => {
  if (!request.file) {
    return next()
  }

  const extension = request.file.mimetype.split('/')[1]
  request.body.photo = `${uuid.v4()}.${extension}`
  
  const photo = await jimp.read(request.file.buffer)
  await photo.resize(800, jimp.AUTO)
  await photo.write(`./public/uploads/absence-reports/${request.body.photo}`)

  next()
}

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
    let imageUrl = null
    
    if (report.photo) {
      imageUrl = `${request.secure ? 'https://' : 'http://'}${request.headers.host}/uploads/absence-reports/${report.photo}`
    }

    await mail.send({
      filename: 'absence-report',
      subject: `Absence Report of ${request.user.first_name} ${request.user.last_name} - ${dateNow}`,
      to: [
        'dominik.hanke@devugees.org',
        'carl.neuberger@devugees.org'
      ],
      report,
      imageUrl,
      user: request.user,
      moment
    });
  } catch (error) {
    console.error(error)
    report.remove()

    request.flash('danger', 'The report could not be send. Please try again later.')
    return response.redirect('back')
  }

  request.flash('success', `Successfully send your report.`);
  return response.redirect(`/admin/absence-reports/`);
}


