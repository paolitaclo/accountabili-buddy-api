// 'use strict';

const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const passport = require('passport');

const knex = require('../knex');
const Users = require('../models/users');
const Events = require('../models/events');

function isEmpty(value) {
  return value === undefined || value.trim().length === 0;
}

function hasMinLength(value, minLength) {
  return !isEmpty(value) && value.length >= minLength;
}

function validateUser({ firstName, lastName, email, password }) {
  const errors = [];

  if (isEmpty(email)) {
    errors.push('Email must not be blank');
  }
  if (!hasMinLength(password, 6)) {
    errors.push('Password must be at least 6 characters long');
  }
  if (isEmpty(firstName)) {
    errors.push('First Name must not be blank');
  }
  if (isEmpty(lastName)) {
    errors.push('Last Name must not be blank');
  }

  return errors.length > 0 ? boom.create(400, errors.join('. ')) : undefined;
}

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
    const body = req.body;
    const error = validateUser(body);
    if (error) {
      return next(error);
    }

    return bcrypt.hash(body.password, 12)
    .then(hashedPassword => Users.forge({
      user_name: body.userName,
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      hashed_password: hashedPassword,
      profile_image_url: body.profileUrl
    })
    .save()
    .then((user) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(user));
    }))
    .catch(err => next(err));
  });

router.route('/users/:id')
  .get((req, res, next) => {
    Users.where('id', '=', req.params.id)
    .fetch()
    .then((user) => {
      if (!user) {
        return next(boom.create(400, 'Used not found'));
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

router.route('/users/:id/score')
  .get((req, res, next) => {
    knex('events').where('user_id', req.params.id).first()
    .then((userInEvent) => {
      if (!userInEvent) {
        return next(boom.create(400, 'User don\'t have events yet'));
      }
      return knex('events').sum('reps').where('user_id', req.params.id).first();
    })
    .then((allTimeScore) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(allTimeScore);
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
