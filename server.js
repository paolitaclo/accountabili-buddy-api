if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');

const app = express();
const port = process.env.PORT || 9001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:9001/users/facebook/return'
}, function (accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(bodyParser.json());
app.use(cookieParser()); // come back later here
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/users/facebook',
  passport.authenticate('facebook'));

app.get('/users/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

  app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
      res.send({ user: req.user });
    });

const users = require('./routes/users');
const teams = require('./routes/teams');
const token = require('./routes/token');

app.use(users);
app.use(teams);
app.use(token);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log("Server starting up on " + port);
});

module.exports = app;
