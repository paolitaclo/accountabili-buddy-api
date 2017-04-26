'use strict';

const boom = require('boom');
const express = require('express');
const router = express.Router();
const Teams = require('../models/teams');

// GET route to teams API to retrieve list of teams
router.route('/teams')
  // fetch all teams
  .get((req, res, next) => {
    console.log('hello');
    Teams.fetchAll({ withRelated: ['users'] })
      .then((teamsList) => {
        // console.log(JSON.stringify(teamsList));
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(teamsList));
      })
    .catch(function (err) {
      return next(err);
    });
  });

  // create a new team
router.route('/teams')
  .post((req, res, next) => {
    console.log('I want to post');
    const { name } = req.body;
    if (!name || !name.trim()) {
      return next(boom.create(400, 'Team name must not be blank'));
    }
    Teams.forge({
      name: req.body.name
    })
    .save()
    .then(function (team) {
      console.log(JSON.stringify(team));
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(team));
    })
    .catch((err) => next(err));
  });

// UPDATE route to teams API to edit a pre-existing teams

module.exports = router;
