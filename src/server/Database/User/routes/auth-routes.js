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




router.get('/auth/logout', (req, res)=>{
    req.logOut();
    res.send('Logged Out Successfully');
});

module.exports = router;
