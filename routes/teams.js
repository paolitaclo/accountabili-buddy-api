const express = require('express');

const router = express.Router();
const Teams = require('../models/teams');
const boom = require('boom');


router.route('/teams')
  // fetch all teams
  .get((req, res, next) => {
    Teams.fetchAll({ withRelated: ['users'] })
      .then((teamsList) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(teamsList));
      })
    .catch((err) => {
      next(err);
    });
  })
  // create a new team!
  .post((req, res, next) => {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return next(boom.create(400, 'Team name must not be blank'));
    }
    return Teams.forge({
      name: req.body.name,
    })
    .save()
    .then((team) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(team));
    })
    .catch(err => next(err));
  });


router.route('/teams/:id')
    // fetch team by id
    .get((req, res, next) => {
      const { id } = req.params;
      Teams.forge({ id })
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
      });
    })
    // update team by id
    .put((req, res, next) => {
      const { id } = req.params;
      return new Teams({ id })
      .fetch({ require: true })
      .then((team) => {
        if (!team) {
          throw boom.create(400, 'Team Not Found');
        }
        team.save({ name: req.body.name || team.get('name') });
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify('Team details updated'));
      })
      .catch((err) => {
        res.status(500).send({ error: true, data: { message: err.message } });
        next(err);
      });
    })
    // delete a team by id
    .delete((req, res, next) => {
      Teams.forge({ id: req.params.id })
      .fetch({ require: true })
      .then((team) => {
        if (!team) {
          throw boom.create(400, 'Team Not Found');
        }
        team.destroy();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify('Team successfully deleted'));
      })
      .catch((err) => {
        res.status(500).send({ error: true, data: { message: err.message } });
        next(err);
      });
    });

module.exports = router;
