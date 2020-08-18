const mongoose = require('mongoose');
const passwordHash = require('password-hash');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
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
});

userSchema.pre('save', function(next){
    const hashedPassword = passwordHash.generate(this.password);
    this.set({password: hashedPassword});
    next();
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;