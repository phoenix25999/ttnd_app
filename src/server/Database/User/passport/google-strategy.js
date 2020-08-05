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
                User.findOne({ email: profile._json.email }).then((existingUser) => {
                  console.log(profile)
                    if (existingUser) {
                      done(null, existingUser);
                    } else {
                      const newUser = new User({
                        email: profile._json.email,
                        name: profile._json.name,
                        picture: profile._json.picture
                      });
                      newUser.save().then((newUser) => {
                        done(null, newUser);
                      });
                    }
                  });
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done) => {
        User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((e) => {
        done(new Error("Failed to deserialize an user"));
      });
  });
}