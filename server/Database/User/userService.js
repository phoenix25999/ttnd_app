const User = require('./userModel');

exports.getUserRole = async (email) => {
    const userRole = User.find({email: email},{role: 1,_id:0});
    return userRole;
};