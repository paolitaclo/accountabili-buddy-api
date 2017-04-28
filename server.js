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
const token = require('./routes/token');
const tokenOauth = require('./routes/tokenOauth');


app.use(users);
app.use(teams);
app.use(token);
app.use(tokenOauth);
app.use(profile);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log('Server starting up on ', port);
});

module.exports = app;
