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

exports.loginUser = (loginDetails) => {
    const user = User.find({email: loginDetails.email}, {password: 1, _id: 0})
        .then(async existingPassword=>{
            if(existingPassword.length){
                if(passwordHash.verify(loginDetails.password, existingPassword[0].password)){
                    return User.find({password: existingPassword[0].password},{password: 0});
                }

                else{
                    return {error: 'Wrong credentials'};
                }
            }
            else{
                return {error: "User doesn't exist"};
            }
        })
        .catch(err=>err);
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

exports.checkUser = (email) => {

    const user = User.find({email:email})
        .then(existingUser=>{

            if(existingUser.length){
                return existingUser;
            }

            else{
                return {error: "User doesn't exist"}
            }
        });
    return user;
}

exports.updatePassword = async (userInfo) => {

    const hashedPassword = passwordHash.generate(userInfo.password);
    
    if(userInfo.oldPassword){
        const verifyUser = User.find({email: userInfo.email}, {password: 1, _id: 0})
        .then(async existingPassword=>{
            
            if(existingPassword.length){
                if(passwordHash.verify(userInfo.oldPassword, existingPassword[0].password)){
                    
                    return User.updateOne({email: userInfo.email}, {password: hashedPassword},{password: 0});
                }

                else{
                    console.log('here');
                    return {error: 'Old password is not valid'};
                }
            }
        })
        .catch(err=>err);

        return verifyUser;
    }

    else{
        
        const updatedPassword = User.updateOne({email: userInfo.email}, {password: hashedPassword});
        return updatedPassword; 
    }

}