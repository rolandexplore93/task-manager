const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Task = mongoose.model('task', new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true}))

module.exports = Task