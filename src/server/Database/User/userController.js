const userService = require('./userService');

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
    const users = await userService.getAllUsersDetails();
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
  try{
    const profile = await userService.updateProfile(req.params.userID, req.body);
    res.send(profile);
  } catch(err){
    res.status(400).send(err);
  }
}
