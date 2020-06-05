const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../userModel');

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: '66927199330-mfd0umc84vt29h6mn392d9m5vndp3m11.apps.googleusercontent.com',
            clientSecret: '4373WSrjo_GsQmC1k4TowUOu',
            callbackURL: '/auth/google/redirect'
        },
            (request, accessToken, refreshToken, profile, done) => {
                User.findOne({email:profile.email})
                .then(user=> {
                    if(!user){
                        User.create({
                            name: profile._json.name,
                            email: profile._json.email,
                            role: 'employee'
                        }).then(newUser=> {
                                console.log(`New User Created  ${newUser}`);
                            });
                    }
                });
                return done(null, profile);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}