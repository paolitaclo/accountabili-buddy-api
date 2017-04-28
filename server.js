if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');

const app = express();
const port = process.env.PORT || 9001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

app.use(bodyParser.json());
app.use(cookieParser());

const users = require('./routes/users');
const teams = require('./routes/teams');
const events = require('./routes/events');

app.use(users);
app.use(teams);
app.use(events)

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log("Server starting up on " + port);
});

module.exports = app;
