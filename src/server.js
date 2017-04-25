import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import team from './routes/teams.routes';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

app.disable('x-powered-by');


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

app.use(express.static(path.join('public')));

// CSRF protection
app.use((req, res, next) => {
  if (/json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
});

app.use(team);
// app.use(users);
app.use((req, res) => {
  res.sendStatus(404);
});

// arrow functions
const server = app.listen(3000, () => {
// destructuring
  const { address, port } = server.address();

  // string interpolation
  console.log(`Example app listening at http://${address}:${port}`);
});
