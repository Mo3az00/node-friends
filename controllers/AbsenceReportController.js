const mongoose = require('mongoose')
const AbsenceReport = mongoose.model('AbsenceReport')
const mail = require('../handlers/mail')
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (request, response, next) => {
  // check if there is no new file to resize
  if (!request.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = request.file.mimetype.split('/')[1];
  request.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(request.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/absence-reports/${request.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};


// Display the list of the User's reports
exports.list = async (request, response) => {
  const AbsenceList = await AbsenceReport.find({user: request.user._id })
  response.render('admin/reportForm', {
    title: 'Add Absence Report',
    AbsenceList
  })
 }

// Display the form to add a report
exports.reportForm = async (request, response) => {
  response.render('admin/absenceReport', {
    title: 'add absence report'
  })
}

// Validate data and saving the report, if okay
exports.createReport = async (request, response, next) => {
  request.body.user = request.user._id;
  const Absence = await (new AbsenceReport(request.body)).save();
  if(!Absence){
    request.flash('danger', `Successfully Created Care to leave a review?`);
    response.redirect(`/admin/absence-reports/add`);
  }
  await mail.send({
    Absence,
    filename: 'email-send',
    subject: 'send an Email',
  });

  request.flash('info', `Successfully Created Care to leave a review?`);
  response.redirect(`/admin/absence-reports/add`);
  // response.send("it works")
  next()
}


