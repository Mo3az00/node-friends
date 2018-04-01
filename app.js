const path = require('path')
const helmet = require('helmet')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const promisify = require('es6-promisify')
const helpers = require('./helpers')
const errorHandlers = require('./handlers/errorHandlers')
const AuthController = require('./controllers/AuthController')

const webRoutes = require('./routes/web')
const adminRoutes = require('./routes/admin')

// require passport
require('./handlers/passport')

// create the app
const app = express()

// advance security with Helmet
app.use(helmet())

// set the template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')))
app.use('/.well-known', express.static(path.join(__dirname, '.well-known'), {}))

// enable sessions allow to store data on visitors from request to request
// this can keep users logged in and allows us to send flash messages
app.use('/admin', session({
  secret: process.env.SESSION_SECRET || 'notaverysecuresecret',
  key: process.env.SESSION_KEY || 'notaverysecurekey',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// handle user authentication using Passport
app.use(passport.initialize())
app.use(passport.session())

// the flash middleware let's us use req.flash('error', 'Message'),
// which will then pass that message to the next page the user requests
app.use('/admin', flash())

// pass variables to use in all requests + templates
app.use((request, response, next) => {
  response.locals.helpers = helpers
  response.locals.currentPath = request.path
  response.locals.baseUrl = `${request.secure ? 'https://' : 'http://'}${request.headers.host}`
  response.locals.user = request.user || null
  response.locals.demo = process.env.DEMO_MODE || false

  if (request.path.includes('/admin')) {
    response.locals.flashes = request.flash()
  }
  next()
})

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req)
  next()
})

// take the raw requests and turn them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// load our defined routes and check for logged-in users in the admin area
app.use('/', webRoutes)

app.use(/\/admin\/((?!login|password-forgot|password-reset).)*/, AuthController.isLoggedIn)
app.use('/admin', adminRoutes)

// if above routes didn't work, we 404 them and forward to error handler
app.use(errorHandlers.notFound)

// handle validation errors
app.use(errorHandlers.flashValidationErrors)

// print a stacktrace for errors in development environments
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors)
}

// handle uncatched errors in production
app.use(errorHandlers.productionErrors)

// export the app, that gets started by start.js
module.exports = app
