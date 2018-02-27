const mongoose = require('mongoose')

exports.list = (request, response) => {
  response.render('admin/projectList', {
      title: 'Projects',
      projects: {}
  })
}