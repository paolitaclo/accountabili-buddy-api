'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const Teams = require('../models/teams');

// import node module
const boom = require('boom');

const router = express.Router();


// GET route to teams API to retrieve list of teams
router.get('/teams', (req, res, next) => {

});

export default router;

// POST route to teams API - to create a new teams


// UPDATE route to teams API to edit a pre-existing teams
