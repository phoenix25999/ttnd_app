const User = require('./userModel');

exports.getUserRole = async (email) => {
    const userRole = User.find({email: email});
    return userRole;
};


exports.updateProfile = async (email, about) => {
    const profile = User.updateOne({email: email}, {about: about});
    return profile;
};