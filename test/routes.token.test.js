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

  it('should respond to a POTS /token with a valid email and password', (done) => {
    agent
      .post('/token').set('Accept', 'application/json')
      .send({
        email: 'homecastellanos@gmail.com',
        password: 'lunalunita'
      })
      .expect(200, done);
  });
// it('should respond to a POTS /token with an invalid email and a valid password and a status code of 400', (done) => {
//     agent
//       .post('/token').set('Accept', 'application/json')
//       .send({
//         email: 'homecastellanos@gmail.com',
//         password: 'lunalun'
//       })
//       .expect(400, done);
//   });
});
