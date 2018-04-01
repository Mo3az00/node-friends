const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// import environmental variables
require('dotenv').config()

// connect to our database and handle any bad connections
let mongooseOptions = {}

if (process.env.DATABASE_USERNAME &&
  process.env.DATABASE_PASSWORD &&
  process.env.DATABASE_USERNAME.trim() !== '' &&
  process.env.DATABASE_PASSWORD.trim() !== '') {
  mongooseOptions = {
    auth: {
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    }
  }
}

(async () => {
  const connection = await mongoose
    .connect(
      `mongodb://${process.env.DATABASE_HOST || 'localhost'}:${process.env.DATABASE_PORT || 27017}/${process.env.DATABASE_NAME || 'express-mongo-boilerplate'}`,
      mongooseOptions
    )
    .catch((error) => {
      console.error(`ERROR => ${error.message}\n`)
    })

  if (!connection) {
    process.exit()
  }

  // load all models
  require('./models/HomepageTech')
  require('./models/ToDo')
  require('./models/User')
  require('./models/UserProject')
  require('./models/UserTechFavorite')
  require('./models/AbsenceReport')

  // load the app
  const app = require('./app')
  app.set('port', process.env.PORT || 7777)

  const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`)
  })
})()
