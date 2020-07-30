const User = require('./userModel');

exports.getUserRole = async (email) => {
    const userRole = User.find({email: email});
    return userRole;
};

exports.getAllUsersDetails = async () => {
    const users = User.find({});
    return users;
};


exports.updateProfile = async (userID, details) => {
    const profile = User.updateOne({_id: userID}, details);
    return profile;
};