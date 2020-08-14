const userService = require('./userService');
const cloudinary = require('cloudinary');

exports.addUser = async ( req, res ) => {

  let profilePic = req.body.gender==='female'?'https://res.cloudinary.com/phoenix25999/image/upload/v1597239611/female_kkutus.png':'https://res.cloudinary.com/phoenix25999/image/upload/v1597239066/male_shv0pc.webp';

  let newUser = {
    name: `${req.body.firstname} ${req.body.lastname}`,
    email: req.body.email,
    role: req.body.role,
    gender: req.body.gender,
    picture: profilePic
  }

  if(req.body.department){
    newUser = {
      ...newUser,
      department: req.body.department
    }
  }

  try{
    const user = await userService.addUser(newUser);
    res.send(user);
  } catch(err){
    res.status(400).send(err);
  }
}

exports.getUserDetails = async (req, res) => {
  let email = req.params.email;
  try {
    const userRole = await userService.getUserRole(email);
    res.send(userRole);
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.getAllUsersDetails = async (req, res) => {
  
  try {
    const users = await userService.getAllUsersDetails(req.params.userID);
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.getUserName = async (req, res) => {
  let email = req.params.email;
  try {
    const userName = await userService.getUserName(email);
    res.send(userName);
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.updateProfile = async (req, res) => {
  console.log(req.file);
  let updatedUserDetails = {
    ...req.body
  }

  if(req.file){
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result);
  
    updatedUserDetails = {
      ...updatedUserDetails,
      picture: result.secure_url
    }
  }
  

  try{
    
    const profile = await userService.updateProfile(req.params.userID, updatedUserDetails);
    console.log(profile);
    res.send(profile);
  } catch(err){
    res.status(400).send(err);
  }
}

exports.deleteUser = async (req, res) => {
  try{
    const deletedUser = await userService.deleteUser(req.params.userID);
    res.send(deletedUser);
  } catch(err){
    res.status(400).send(err);
  }
}

exports.getAdmins = async (req, res) => {
  
  try{
    const admins = await userService.getAdmins(req.params.department);
    console.log(admins);
    res.send(admins);
  } catch(err){
    res.status(400).send(err);
  }
}
