const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const url = require('url');
const keys = require('../keys');

router.get('/auth/google',
  passport.authenticate('google', { scope: 
      [ 'profile', 'email' ] }
));

router.get(
    '/auth/google/redirect',
    passport.authenticate('google'),
    (req, res) => {
          const tokenPayload = {
            userName: res.req.user.displayName,
            email: res.req.user.email
          }
          const token = jwt.sign(tokenPayload, keys.JWT.TOKEN_SECRET, {expiresIn: '60m'} );
          const tokenData = {
            token: token,
            name: tokenPayload.userName,
            email: tokenPayload.email
          }
          res.redirect(url.format({
            pathname: 'http://localhost:3000/dashboard/buzz',
            query: tokenData
          }));
        }
);

// router.get('/auth/google/redirect', passport.authenticate('google', {
//   successRedirect: 'http://localhost:3000/dashboard/buzz',
//   failureRedirect:'http://localhost:3000/dashboard'
// }));

router.get('/auth/user', (req, res) => {
  console.log('sdalk');
  res.status(200).json({
    authenticated: true,
    user: req.user,
  })
});


router.get('/auth/logout', (req, res)=>{
    req.logOut();
    res.send('Logged Out Successfully');
});

module.exports = router;
