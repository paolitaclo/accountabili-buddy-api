'use strict';

const express = require('express');
const router = express.Router();
const UsersExercisesImages = require('../models/users_exercises_images');

router.route('/events')
  .get((req, res, next) => {
    UsersExercisesImages.fetchAll({ withRelated: ['users', 'exercises', 'images'] })
    .then((eventsList) => {
      console.log(eventsList)
      res.send(JSON.stringify(eventsList))
    })
  })


module.exports = router;
