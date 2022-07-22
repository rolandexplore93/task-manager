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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true,
    // toJSON: {virtuals: true}
}))

module.exports = Task