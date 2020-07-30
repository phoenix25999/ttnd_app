const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: {
        type: String,
        enum: ['super-admin', 'admin', 'employee'],
        default: 'employee'
    },
    picture: String,
    about: String
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;