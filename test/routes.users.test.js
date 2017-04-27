s'use strict';

process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

describe('USERS ROUTES', () => {
  const agent = request.agent(server);

  before( (done) => {
    knex.migrate.latest()
      .then( () => {
        done();
      })
      .catch( (err) => {
        done(err);
      })
  });

  beforeEach( (done) => {
    knex.seed.run()
      .then( () => {
        done();
      })
      .catch( (err) => {
        done(err);
      })
  });

  describe('GET /users', () => {
    it('should respond with a status of 200', (done) => {
      agent
        .get('/users')
        .expect(200, done);
    });

    it('should respond with a Content-Type of application/json', (done) => {
      agent
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/, done);
    });

    // it('should respond with an array of all users with their relationships', (done) => {
    //   agent.get('/users').set('Accept', 'application/json').expect(
    //     [
    //       {
    //         id: 1,
    //         user_name: 'klam',
    //       }
    //     ]
    //   )
    // })
  })
})
