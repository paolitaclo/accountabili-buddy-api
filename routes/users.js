'use strict';

const express = require('express');
const router = express.Router();
// const knex = require('../knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');

const Users = require('../models/users');

router.route('/users')
  .get((req, res, next) => {
    Users.fetchAll({ withRelated: ['teams', 'images'] })
    .then((usersList) => {
      console.log(JSON.stringify(usersList));
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersList));
    })
    .catch((err) => next(err));
  })
  .post((req, res, next) => {
    const user_name = req.body.userName;
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !email.trim()) {
      return next(boom.create(400, 'Field must not be blank'));
    }
    if (!password || password.length < 6) {
      return next(boom.create('Password must be at least 6 characters long'));
    }
    bcrypt.hash(password, 12)
    .then((hashed_password) => {
      return Users.forge({
        user_name: user_name,
        first_name: first_name,
        last_name: last_name,
        email: email,
        hashed_password: hashed_password
      })
      .save()
      .then((user) => {
        let u = JSON.parse(JSON.stringify(user));
        delete u.hashed_password;
        res.setHeader('Content-Type', 'application/json');
        res.send(u);
      });
    });
  });
module.exports = router;
