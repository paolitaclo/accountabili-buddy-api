'use strict';

process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha');
const assert = require('chai').assert;
const request = require('supertest');
const Teams = require('../models/teams');
const knex = require('../knex');
const server = require('../server');

describe('TEAMS ROUTES', () => {
  const agent = request.agent(server);

  before((done) => {
    knex.migrate.latest()
          .then(() => {
              done();
          })
          .catch((err) => {
              done(err);
          });
  });

  beforeEach((done)=>{
    knex.seed.run()
            .then(() => {
                done();
            })
            .catch((err) => {
                done(err);
            });
  });

  describe('GET /teams', () => {
    it('should respond with a status code of 200', (done) => {
      agent
        .get('/teams')
        .expect(200, done);
    });

    it('should respond with a Content-Type of application/json', (done) => {
      agent
        .get('/teams')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/, done);
    });

    it('should respond with array of all equipment type objects', (done) => {
      agent
        .get('/teams')
        .set

  })
})
