const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const toDoSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: 'Please enter a text!'
    },
    created_at: Date
})

toDoSchema.pre('save', function(next) {
    this.created_at = new Date()
    next()
})

module.exports = mongoose.model('ToDo', toDoSchema)