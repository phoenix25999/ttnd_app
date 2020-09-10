const userService = require('./userService');
const cloudinary = require('cloudinary');
const keys = require('./keys');
const jwt = require('jsonwebtoken')
const url = require('url');
const { sendMail } = require('../../middleware/nodeMailer');

exports.addUser = async ( req, res ) => {

  let profilePic = req.body.gender==='female'?'https://res.cloudinary.com/phoenix25999/image/upload/v1597239611/female_kkutus.png':'https://res.cloudinary.com/phoenix25999/image/upload/v1597239066/male_shv0pc.webp';

  let newUser = {
    name: `${req.body.firstname} ${req.body.lastname}`,
    email: req.body.email,
    password: req.body.password,
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
    let mailSubject = `Welcome to TTND`;
    let mailBody = `Hello, ${user.name} welcome to TTND. We're excited to see you here!`;

    sendMail(user.email, mailSubject, mailBody);
    res.send(user);
  } catch(err){
    res.status(400).send(err);
  }
}

exports.loginUser = async (req, res) => {
  try{
    const loggedinUser = await userService.loginUser(res, req.body);
    if(loggedinUser.error){
      throw new Error(loggedinUser.error);
    }
    const tokenPayload = {
      userName: loggedinUser[0].name,
      email: loggedinUser[0].email
    }
    const token = jwt.sign(tokenPayload, keys.JWT.TOKEN_SECRET, {expiresIn: '60m'} );
    const tokenData = {
      token: token,
      name: tokenPayload.userName,
      email: tokenPayload.email
    }
    const redirectURL = url.format({
      pathname: '/dashboard/buzz',
      query: tokenData
    });
    res.send({redirectTo: redirectURL});
  } catch(err){
    res.status(400).json({message: err.message});
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
  let updatedUserDetails = {
    ...req.body
  }

  if(req.file){
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    updatedUserDetails = {
      ...updatedUserDetails,
      picture: result.secure_url
    }

    
  }
  

  try{
    
    const profile = await userService.updateProfile(req.params.userID, updatedUserDetails);
    let mailSubject = `Profile updated`;
    let mailBody = `Hello, Your profile is successfully updated. If you didn't recognise this, please contact support.`;

    sendMail(profile.email, mailSubject, mailBody);
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
    res.send(admins);
  } catch(err){
    res.status(400).send(err);
  }
}
