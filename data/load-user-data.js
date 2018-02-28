const fs = require('fs')
const mongoose = require('mongoose')

require('dotenv').config({ path: __dirname + '/../variables.env' })

mongoose.Promise = global.Promise
mongoose.connect(
    `mongodb://${process.env.DATABASE_HOST || localhost}:${process.env.DATABASE_PORT || 27017}/${process.env.DATABASE_NAME || 'express-mongo-boilerplate'}`
)
    .catch((error) => {
        console.error(`ERROR → ${error.message}`)
        process.exit(1)
    })

// import user model and user data
const User = require('../models/User')
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'))

// import data
async function loadData() {
  try {
    const existingUsers = await User.count()

    if (existingUsers > 0) {
        console.log('\nError! The setup was already run before. Remvoe the users collection, before you can run this again!\n\n\n')
        process.exit()
    }

    await User.insertMany(users)
    console.log('All users created!\n\n')
    process.exit()
  } catch(e) {
    console.log('\nError! The Error info is below.\n\n')
    console.log(e)
    process.exit()
  }
}

loadData()