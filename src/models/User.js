const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./Task');

const userSchema = new Schema({
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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},  {timestamps: true})

// virtual relationship
userSchema.virtual('tasks', {
    ref: "task",
    localField: "_id",
    foreignField: "owner"
})

// hide private data when user login
userSchema.methods.toJSON = function(){
    const userObject = this.toObject();
    
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject
}

// custom mongoose scheme methods to genrate auth token for user to login
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = await jwt.sign(user._id.toString(), process.env.JWT_SECRET_KEY);

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// custom mongoose schema using statics method to confirm user email and password
userSchema.statics.findByCredentials = async function(email, password){
    const user = await User.findOne({email});
    if (!user) throw new Error("Incorrect Email address");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Errow("Unable to login! Password is incorrect");

    return user
}

// hash password before saving to database
userSchema.pre('save', async function(next){
    const user = this;
    const salt = await bcrypt.genSalt();

    if (user.isModified("password")){
        user.password = await bcrypt.hash(user.password, salt)
    }
    next();
})

// Middleware: Delete user tasks when user is deleted
userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({ owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User
