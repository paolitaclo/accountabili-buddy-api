const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const boom = require('boom');

const router = express.Router();
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const cert = process.env.JWT_SECRET;
const Users = require('../models/users');

router.route('/token')
  .post((req, res, next) => {
    return Users.where('email', '=', req.body.email)
    .fetch()
    .then((userInfo) => {
      const hashedPassword = userInfo.get('hashed_password');
      return bcrypt.compare(req.body.password, hashedPassword);
    })
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
