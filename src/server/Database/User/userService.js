const User = require('./userModel');

exports.getUserRole = async (email) => {
    const userRole = User.find({email: email},{_id:0});
    return userRole;
};

exports.getUserName = async (email) => {
    const userName = User.find({email: email},{name: 1,_id:0});
    return userName;
};

exports.updateProfile = async (email, about) => {
    const profile = User.updateOne({email: email}, {about: about});
    return profile;
};