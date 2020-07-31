const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: {
        type: String,
        enum: ['SUPERADMIN', 'ADMIN', 'EMPLOYEE'],
        default: 'EMPLOYEE'
    },
    picture: String,
    about: String
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;