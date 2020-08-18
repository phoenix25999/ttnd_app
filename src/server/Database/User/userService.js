const User = require('./userModel');
const passwordHash = require('password-hash');

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

exports.loginUser = (res, loginDetails) => {
    console.log(loginDetails);
    const user = User.find({email: loginDetails.email}, {password: 1, _id: 0})
        .then(async existingPassword=>{
            if(existingPassword.length){
                if(passwordHash.verify(loginDetails.password, existingPassword[0].password)){
                    return User.find({password: existingPassword[0].password},{password: 0});
                }

                else{
                    res.status(400).send({message:"Wrong credentials"});
                }
            }
            else{
                res.status(400).send({message:"User doesn't exist"});
            }
        })
        .catch(err=>console.log(err));
    return(user);
}

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

exports.getAdmins = async (department) => {
    const admins = User.find({department: department});
    return admins;
  }