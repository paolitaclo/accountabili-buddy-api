const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const JWT = require('jsonwebtoken');
const cert = process.env.JWT_SECRET;
const Users = require('../models/users');

router.route('/token')
  .post(function (req, res, next) {
    console.log('im here');
    return Users.where('email', '=', req.body.email)
    .fetch()
    .then((userInfo) => {
      console.log('this is user info', userInfo);
      const user = JSON.parse(JSON.stringify(userInfo));
      return bcrypt.compare(req.body.password, user.hashed_password);
    })
    // .catch(err => next(err))
    .then((passwordChecked) => {
      if (!passwordChecked) {
        return next(boom.create(400, 'Bad password or email'));
      }
      return Users.where('email', '=', req.body.email);
    })
    .then((user) => {
      const claim = {
        userId: user.id
      };

      const token = JWT.sign(claim, cert, {
        expiresIn: '7 days'
      });

      user.token = token;
      console.log(user.token);

      delete user.user_name;
      delete user.first_name;
      delete user.last_name;
      delete user.hashed_password;
      delete user.created_at;
      delete user.updated_at;

      res.set('Token', token);
      res.set('Content-Type', 'application/json');
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
    });
  });
module.exports = router;
// module.exports.createUserToken = function(req, res, next) {
//     console.log("im here");
//     return Users.where('email', '=', req.swagger.params.credentials.value.email).fetch()
//         .then((userInfo) => {
//             let user = JSON.parse(JSON.stringify(userInfo));
//             return bcrypt.compare(req.swagger.params.credentials.value.password, user.hashed_password);
//         })
//         .catch((err) => {
//             res.set('Content-Type', 'text/plain');
//             res.status(400).send('Invalid email or password');
//             next(err);
//         })
//         .then(() => {
//             return Users.where('email', '=', req.swagger.params.credentials.value.email)
//                 .fetch()
//         })
//         .then((userResult) => {
//             let user = JSON.parse(JSON.stringify(userResult));
//             const claims = {
//                 userId: user.id
//             };
//             const token = JWT.sign(claims, cert, {
//                 expiresIn: '2 hours'
//             });
//             user.token = token;
//             delete user.first_name;
//             delete user.last_name;
//             delete user.hashed_password;
//             delete user.updated_at;
//             delete user.created_at;
//             res.cookie('token', token, {
//                 path: '/',
//                 httpOnly: true
//             });
//             res.send(user);
//         });
//
// };
