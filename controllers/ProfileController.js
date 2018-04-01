const mongoose = require('mongoose')
const User = mongoose.model('User')
const UserProject = mongoose.model('UserProject')
const UserTechFavorite = mongoose.model('UserTechFavorite')

// Show a user profile (student or teacher)
exports.show = async (request, response) => {
  const profile = await User.findOne({ slug: request.params.slug })

  if (!['student', 'teacher'].includes(profile.role)) {
    return response.redirect('/404')
  }

  const projects = await UserProject.find({ user: profile._id })
  const technologies = await UserTechFavorite.find({ user: profile._id })

  let description = `Hello, I'm ${profile.first_name}, from the Digital Career Institute in Berlin.`

  switch (profile.role) {
    case 'student':
      description = `Hello, I'm ${profile.first_name}, a student at the Digital Career Institute in Berlin. I'm available for hire, if you're looking for a motivated Junior Web Developer!`
      break

    case 'teacher':
      description = `Hello, I'm ${profile.first_name}, a teacher at the Digital Career Institute in Berlin. I'm teaching motivated students to become web developers.`
      break
  }

  response.render('profile', {
    title: `${profile.first_name} ${profile.last_name}`,
    description,
    bodyClass: 'scrolled profile',
    profile,
    projects,
    technologies
  })
}
