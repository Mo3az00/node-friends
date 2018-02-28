const mongoose = require('mongoose')
const UserProjects = mongoose.model('UserProjects')

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


exports.createProject = async (request, response) => {
  const userProjects = new UserProjects(request.body)
  // response.json(request.body)
  await userProjects.save()
  response.redirect('/admin/projects')
}
