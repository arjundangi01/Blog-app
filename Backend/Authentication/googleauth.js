const passport = require("passport");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GOOGLE_CLIENT_ID = "634333166421-2nmf0qbhq9qvk18ql6upgohqfacjjg53.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
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
