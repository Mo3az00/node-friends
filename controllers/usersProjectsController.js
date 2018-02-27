const mongoose = require('mongoose')

exports.list = (request, response) => {
  response.render('admin/projectList', {
    title: 'Projects',
    projects: {}
  })
}


exports.projectForm = (request, response) => {
  response.render('admin/projectForm', {
    title: 'Add Projects',
    projects: {}
  })
}


exports.createProject = (request, response) => {
  response.render('admin/createProject', {
    title: 'Create Project',
    projects: {}
  })
}
