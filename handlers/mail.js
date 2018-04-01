const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const promisify = require('es6-promisify')

// Render a pug file and use juice to generate inline styles
const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/email/${filename}.pug`,
    options
  )

  return juice(html)
}

// Send an email
exports.send = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  const html = generateHTML(options.filename, options)
  const text = htmlToText.fromString(html)
  const mailOptions = {
    from: process.env.MAIL_FROM || 'Node Friends <noreply@node-friends.com>',
    to: options.to || process.env.MAIL_TO,
    replyTo: options.replyTo || 'noreply@node-friends.com',
    subject: options.subject,
    html,
    text
  }

  const sendMail = promisify(transport.sendMail, transport)
  return sendMail(mailOptions)
}
