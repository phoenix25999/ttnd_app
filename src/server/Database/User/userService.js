const User = require('./userModel');

exports.addUser = (newUser) => {

    const user = User.find({email:newUser.email})
        .then(existingUser=>{

            if(!existingUser.length){
                return User.create(newUser);
            }
        });
    return user;
}

exports.getUserRole = async (email) => {
    const userRole = User.find({email: email});
    return userRole;
};

exports.getAllUsersDetails = async ( userID ) => {
    const users = User.find({_id: {$ne: userID}});
    return users;
};


exports.updateProfile = async (userID, details) => {

    const profile = User.findOne({email: details.email})
        .then(existingUser=>{
            if(!existingUser){
                return User.updateOne({_id: userID}, details);
            }
        });
    return profile;

    
};

exports.deleteUser = async ( userID ) => {
    const deletedProfile = User.deleteOne({_id: userID});
    return deletedProfile;
}