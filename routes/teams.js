'use strict';

const boom = require('boom');
const express = require('express');
const router = express.Router();
const Teams = require('../models/teams');


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
  })
  // create a new team
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


router.route('/teams/:id')
    // fetch team by id
    .get((req, res) => {
      Teams.forge({id: req.params.id})
      .fetch()
      .then((team) => {
        if (!team) {
          throw boom.create(400, 'Team Not Found');
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(team));
      })
      .catch((err) => {
        next(err);
      })
    })
    // update team by id
    .put((req, res, next) => {
      Teams.forge({id: req.params.id})
      .fetch({require: true})
      .then((team) => {
        team.save({
          name: req.body.name || team.get('name')
        })
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(team));
      })
      .catch((err) => {
          next(err);
      });
    });



// UPDATE route to teams API to edit a pre-existing teams

module.exports = router;
