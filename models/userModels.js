const mongoose = require('mongoose')

const userModelSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'You must provide a first name'
    },
    last_name: {
        type: String,
        required: 'You must provide a last name'
    },
    role: {
        type: String,
        required: true
    },
    birthday: { type: Date },
    phone: String,
    email: {
        type: String,
        required: 'You must provide an email'
    }
})