const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const boom = require('boom');

const router = express.Router();
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const cert = process.env.JWT_SECRET;
const Users = require('../models/users');

router.route('/token')
  .post((req, res, next) => Users.where('email', '=', req.body.email)
    .fetch()
    .then((userInfo) => {
      const hashedPassword = userInfo.get('hashed_password');
      return bcrypt.compare(req.body.password, hashedPassword);
    })
    .then(() => Users.where('email', '=', req.body.email).fetch()
    )
    .then((user) => {
      const userToJSON = user.toJSON();
      const claim = {
        userId: userToJSON.id,
        // email: user.email
      };

      // this code looks a lot like the code in tokenOauth.js... FUNCTION?
      const token = JWT.sign(claim, cert, {
        expiresIn: '7 days'
      });

      userToJSON.token = token;

      delete userToJSON.user_name;
      delete userToJSON.first_name;
      delete userToJSON.last_name;
      delete userToJSON.profile_image_url;
      delete userToJSON.created_at;
      delete userToJSON.updated_at;

      res.set('Token', token);
      res.set('Content-Type', 'application/json');
      res.status(200).json(userToJSON);
    })
    .catch((err) => {
      next(err);
    })
  );

module.exports = router;
