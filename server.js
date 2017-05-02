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
  callbackURL: 'https://bilibuddy-api.herokuapp.com//users/facebook/return',
  passReqToCallBack: true,
  profileFields: ['id', 'emails', 'name']
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const users = require('./routes/users');
const profile = require('./routes/profile');
const teams = require('./routes/teams');
const events = require('./routes/events');
const token = require('./routes/token');
const tokenOauth = require('./routes/tokenOauth');

app.use(users);
app.use(profile);
app.use(teams);
app.use(events);
app.use(token);
app.use(tokenOauth);

app.use((req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  return res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Server starting up on ', port);
});

module.exports = app;
