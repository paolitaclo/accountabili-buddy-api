// 'use strict';

const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const passport = require('passport');

const Users = require('../models/users');

router.route('/users')
  .get((req, res, next) => {
    Users.fetchAll({ withRelated: ['taggedImages', 'teams', 'ownedImages'] })
    .then((usersList) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersList));
    })
    .catch(err => next(err));
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
      return next(boom.create(400, 'Password must be at least 6 characters long'));
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
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(user));
      });
    })
    .catch(err => next(err));
  });

router.route('/users/:id')
  .get((req, res, next) => {
    Users.where('id', '=', req.params.id)
    .fetch()
    .then((user) => {
      if (!user) {
        return next(boom.create(400, 'User not found'));
      }
      return Users.where('id', '=', req.params.id).fetch({
        withRelated: ['teams', 'taggedImages', 'ownedImages']
      });
    })
    .then((userFound) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(userFound));
    })
    .catch(err => next(err));
  })
  .patch((req, res, next) => {
    const id = req.params.id;
    return new Users({ id })
    .fetch()
    .then((user) => {
      console.log(user);
      if (!user) {
        throw boom.create(400, 'User Not Found');
      }
      return user.save(req.body, { patch: true });
    })
    .then((userUpdated) => {
      const u = userUpdated.toJSON();
      console.log('updated: ', u);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(u));
    })
    .catch(err => next(err));
  });

router.route('/users/facebook')
  .get(passport.authenticate('facebook', { scope: ['email'], failureRedirect: '/' }),
  (req, res) => res.redirect('/profile')
);

router.route('/users/facebook/return')
  .get(passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => res.redirect('/profile')
  );

module.exports = router;
