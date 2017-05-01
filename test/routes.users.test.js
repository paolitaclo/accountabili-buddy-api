// 'use strict';

process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const getAllUsers = require('./fixtures/get_all_users');
const getUserById = require('./fixtures/get_user_by_id');

describe('TESTS FOR USERS ROUTES', () => {
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

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // describe('GET /users', () => {
    // it('should respond with a status of 200', (done) => {
    //   agent
    //     .get('/users')
    //     .expect(200, done);
    // });
    //
    // it('should respond with a Content-Type of application/json', (done) => {
    //   agent
    //     .get('/users')
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /application\/json/, done);
    // });

  it('should respond FROM get/users with an array of all users with their relationships', (done) => {
    agent
    .get('/users').set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(getAllUsers, done);
  });

  it('should respond from GET /users/:id with an object of the user with the related table objects', (done) => {
    agent.get('/users/3').set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(getUserById, done);
  });

  it('should respond from GET /users/:id with a status code of 400 when user not found', (done) => {
    agent.get('/users/10').set('Accept', 'application/json')
    .expect(400, done);
  });

  it('should handle an empty POST to /users and return a status code of 400', (done) => {
    agent
    .post('/users').set('Accept', 'application/json')
    .expect(400, done);
  });

  it('should handle an empty email with POST to /users and return a status code of 400 field must not be blank', (done) => {
    agent
    .post('/users')
    .set('Accept', 'application/json')
    .send({
      userName: 'lunalunera',
      firstName: 'Luna',
      lastName: 'Claros',
      password: 'lunalunita'
    })
    .expect(400, done);
  });
});
