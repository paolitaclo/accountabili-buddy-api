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
      console.log('this is image row: ', image.toJSON());
      const idImage = image.get('id');
      // need to find how to add the usersToTag
      return Events.forge({
        image_id: idImage,
        user_id,
        reps,
        team_id
      }).save(null, { transacting: t });
    }))
    .then((event) => {
      console.log('this is event row: ', event.toJSON());
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(event));
    })
    .catch((err) => {
      console.log('status ', err);
      next(err);
    });
  });

module.exports = router;
