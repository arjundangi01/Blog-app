const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, cb) {
      let user = profile._json;
      console.log(user);
      return cb(null, user);

      // console.log(profile);
    }
  )
);

module.exports = passport;