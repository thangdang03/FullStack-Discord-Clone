const passport = require("passport");

const FacebookStrategy = require("passport-facebook").Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID } = require("../config/conn.common");
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/api/ath/login/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/ath/login/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log("profile google", profile);
      return cb(null, profile);
  }
));

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "/api/ath/login/github/callback"
},
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));