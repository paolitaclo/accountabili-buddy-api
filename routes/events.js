'use strict';

const express = require('express');
const router = express.Router();
const boom = require('boom');
const bookshelf = require('../bookshelf');
const Events = require('../models/events');
const Images = require('../models/images');
const Promise = require('bluebird');

router.route('/events')
  .get((req, res, next) => {
    Events.fetchAll({ withRelated: ['images', 'user'] })
    .then((eventsList) => {
      console.log('this is eventList: ', eventsList.toJSON());
      res.send(JSON.stringify(eventsList));
    })
    .catch((err) => {
      next(err);
    });
  })
  // create a new events
  .post((req, res, next) => {
    const { user_id, imageUrl, caption, reps, team_id } = req.body;
    bookshelf.transaction(t =>
    Images.forge({
      imageUrl,
      caption
    })
    .save(null, { transacting: t })
    .then((image) => {
      const idImage = image.get('id');
      return Events.forge({
        image_id: idImage,
        user_id,
        reps,
        team_id
      }).save(null, { transacting: t });
    }))
    .then((event) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(event));
    })
    .catch((err) => {
      next(err);
    });
  });

module.exports = router;
