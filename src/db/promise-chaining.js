require('./mongoose');
const User = require('../models/User');

User.findByIdAndUpdate('62d6255074eef04f61bb46ae', {age: 29}).then(user => {
    console.log(user);
    return User.countDocuments({age: 29})
}).then(result => {
    console.log(result)
}).catch(err => console.log(err))
