const keys = require('../keys');
const jwt = require('jsonwebtoken');

const tokenVerify = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Token is in the form of Bearer <token>
  if(token===null) return res.sendStaus(401);

  jwt.verify(token, keys.JWT.TOKEN_SECRET, (err, user) => {
    if (err) return res.send({status: false, message: 'Unknown Token. Please Login'});
    req.user = user;
    next();
  })
};

module.exports = tokenVerify;