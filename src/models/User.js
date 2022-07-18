const mongoose = require('mongoose');
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
        default: "Anonymous Coder",
    },
    age: {
        type: Number,
        required: true,
        default: 999,
        validate(value){
            if (value < 1){ throw new Error ("Age must be a positive number")}
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        default: "anonymous@coder.com",
        validate(value){
            if(!validator.isEmail(value)) throw new Error ("Email is invalid")
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value){
            if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain "password"')
        }
    }
})

module.exports = User
