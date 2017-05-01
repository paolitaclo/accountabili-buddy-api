'use strict';

process.env.NODE_ENV = 'test';
const { describe, it } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const getAllTeams = require('./fixtures/get_all_teams');

describe('TESTS FOR TEAMS ROUTES', () => {
  const agent = request.agent(server);
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      }).catch((err) => {
        done(err);
      });
  });
  beforeEach((done) => {
    knex.seed.run().then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('should return from GET /teams with an array of all teams type objects and their related table objects', (done) => {
    agent.get('/teams').set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(getAllTeams, done);
  });

  it('should handle an empty POST to /teams and return a status code of 400', (done) => {
    agent
      .post('/teams')
      .expect(400, done);
  });

  it('should respond to a  POST /teams', (done) => {
    agent
          .post('/teams')
          .set('Accept', 'application/json')
          .send({
            name: 'Exponentials',
            teamImageUrl: 'https://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
          })
          // .set('Content-Type', /application\/json/)
          .expect('Content-Type', /json/)
          .expect((team) => {
            delete team.body.created_at;
            delete team.body.updated_at;
          })
          .expect(200, {
            id: 4,
            name: 'Exponentials',
            team_image_url: 'https://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
          }, done);
  });

  it('should save a team when calling POST /teams', (done) => {
    agent
          .post('/teams')
          .set('Accept', 'application/json')
          .send({
            name: 'Data Science Team',
            teamImageUrl: 'https://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
          })
          .expect(200, {
            id: 4,
            name: 'Data Science Team',
            team_image_url: 'https://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
          })
          .end(() => {
            agent.get('/teams').set('Accept', 'application/json')
              .expect((response) => {
                // console.log(response.body);
                const [addedTeam] = response.body.filter(team => team.id === 4);
                if (!addedTeam) {
                  throw new Error('Expected recently added team to be in the list of teams');
                }
              })
              .end(done);
          });
  });
});
