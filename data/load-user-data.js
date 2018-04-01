const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

require('dotenv').config({path: path.join(__dirname, '/../.env')})

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

  // import user model and user data
  const User = require('../models/User')
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, '/users.json'), 'utf-8'))

  // import data
  async function loadData () {
    try {
      const existingUsers = await User.count()

      if (existingUsers > 0) {
        console.log('\nError! The setup was already run before. Remove the users collection, before you can run this again!\n\n\n')
        process.exit()
      }

      await User.insertMany(users)
      console.log('All users created!\n\n')
      process.exit()
    } catch (e) {
      console.log('\nError! The Error info is below.\n\n')
      console.log(e)
      process.exit()
    }
  }

  loadData()
})()
