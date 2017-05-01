process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

describe('TESTS FOR TOKEN ROUTES', () => {
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

  it('should handle an umatched email for a POTS /token and return a status code of 400', (done) => {
    agent
      .post('/token').set('Accept', 'application/json')
      .send({
        email: 'klamklam@gahbo.com'
      })
      .expect(400, done);
  });
});
