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
    contact: String,
    age: String,
    gender: String,
    about: String,
    department: {
        type: String,
        enum: ['Hardware', 'Infra', 'Others']
    }
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;