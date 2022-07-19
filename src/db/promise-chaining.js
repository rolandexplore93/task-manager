require('./mongoose');
const User = require('../models/User');

// using proming-chaining approach
// User.findByIdAndUpdate('62d6255074eef04f61bb46ae', {age: 29}).then(user => {
//     console.log(user);
//     return User.countDocuments({age: 29})
// }).then(result => {
//     console.log(result)
// }).catch(err => console.log(err))

// using async-await approach
const updateUserAgeAndCount = async (id, age) => {
    const updateUserAge = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age})
    return updateUserAge
}

updateUserAgeAndCount('62d6255074eef04f61bb46ae', 25).then(result => console.log(result))
.catch(err => console.log(err))
