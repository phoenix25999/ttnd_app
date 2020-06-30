const checkAuth = (req, res, next) => {
    console.log(req.user);
      next();
   
  };
  
  module.exports = checkAuth;