'use strict';

process.env.NODE_ENV = 'test';
const { describe, it } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const getAllTeams = require('./fixtures/get_all_teams');
const getTeamById = require('./fixtures/get_team_by_id');

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

  it('should return from GET /teams/:id with the team object and it\'s related users ', (done) => {
    agent.get('/teams/1').set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(getTeamById, done)
  })

  it('should return a status code of 404 from GET /teams/:id when the team_id does not exist', (done) => {
    agent.get('/teams/9000').expect(400, done)
  })

  it('should return from PUT /teams/:id with a string "Team details updated"', (done) => {
    agent.put('/teams/1').set('Accept', 'application/json')
    .send({
      name: "gToast"
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect('"Team details updated"', done)
  })

  it('should return a status code of 500 from PUT /teams/:id with an empty body', (done) => {
    agent.put('/teams/1').set('Accept', 'application/json')
    .send({})
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect('"Team details updated"', done)
  })

  it('should return a status code of 500 from DELETE /teams/:id when deleting a team that does not exist', (done) => {
    agent.delete('/teams/9000').expect(500, done)
  })

  // it('should return from DELETE /teams/:id with a string "Team successfullyn updated"', (done) => {
  //   agent.del('/teams/1')
  //   .expect(200, done)
  // })
});
