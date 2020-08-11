const User = require('./userModel');
const Resolver = require('../Resolve/resolveModel');

exports.addUser = async (newUser, department) => {

    User.find({email:newUser.email})
        .then( async existingUser=>{

            if(existingUser.length){
            return 'User Already Exists';
            }

            else{
                const user = await User.create(newUser);
                if(newUser.role==='ADMIN'){
                    Resolver.create({_id: user._id, department: department}).then(res=>console.log(res));
                }
                return user;
            }
        });
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

    User.findOne({email: details.email})
        .then(existingUser=>{
            if(existingUser){
                return 'User Already Exists';
            }

            else{
                const profile = User.updateOne({_id: userID}, details);
                console.log(profile);
                return profile;
            }
        })

    
};

exports.deleteUser = async ( userID ) => {
    const deletedProfile = User.deleteOne({_id: userID});
    return deletedProfile;
}