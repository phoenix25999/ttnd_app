const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee'
    },
    picture: String,
    contact: String,
    age: String,
    gender: String,
    about: String
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;