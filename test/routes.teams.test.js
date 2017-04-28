'use strict';

process.env.NODE_ENV = 'test';
const { describe, it } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
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
  
  it('should respond to GET /teams with a status code of 200', (done) => {
    agent
      .get('/teams')
      .expect(200, done);
  });
  it('should respond to GET /teams with a Content-Type of application/json', (done) => {
    agent
      .get('/teams')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/, done);
  });
  it('should return from GET /teams with an array of all teams type objects and their related table objects', (done) => {
    agent.get('/teams').set('Accept', 'application/json').expect(
      [
        {
          id: 1,
          name: 'g42',
          team_image_url: 'http://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
          created_at: '2016-06-26T14:26:16.000Z',
          updated_at: '2016-06-26T14:26:16.000Z',
          users: [
            {
              id: 1,
              user_name: 'klam',
              first_name: 'Kevin',
              last_name: 'Lam',
              profile_image_url: 'https://pbs.twimg.com/profile_images/842876355800788992/bQ4YV83U_400x400.jpg',
              email: 'klamklam@gahbo.com',
              hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
              created_at: '2017-04-24T10:21:16.000Z',
              updated_at: '2017-04-24T10:21:16.000Z',
              _pivot_id: 1,
              _pivot_team_id: 1,
              _pivot_user_id: 1,
            }, {
              id: 2,
              user_name: 'paolita',
              first_name: 'Paola',
              last_name: 'Claros',
              profile_image_url: 'https://pbs.twimg.com/profile_images/832357648884342784/ZDEXxcfN_400x400.jpg',
              email: 'paolita@claros.com',
              hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
              created_at: '2017-04-24T10:22:16.000Z',
              updated_at: '2017-04-24T10:22:16.000Z',
              _pivot_id: 2,
              _pivot_team_id: 1,
              _pivot_user_id: 2,
            }, {
              id: 3,
              user_name: 'mez',
              first_name: 'Mary',
              last_name: 'Lai',
              profile_image_url: 'https://pbs.twimg.com/profile_images/854522454177226752/_PExneEw_400x400.jpg',
              email: 'mez@lychee.com',
              hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
              created_at: '2017-04-24T10:23:16.000Z',
              updated_at: '2017-04-24T10:23:16.000Z',
              _pivot_id: 3,
              _pivot_team_id: 1,
              _pivot_user_id: 3,
            }, {
              id: 4,
              user_name: 'ham-dawg',
              first_name: 'Hamid',
              last_name: 'Aghdaee',
              profile_image_url: 'https://ca.slack-edge.com/T1T555TL0-U3AQUK7GS-9df641a8d4bf-512',
              email: 'h@mid.com',
              hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
              created_at: '2017-04-24T10:23:16.000Z',
              updated_at: '2017-04-24T10:23:16.000Z',
              _pivot_id: 4,
              _pivot_team_id: 1,
              _pivot_user_id: 4,
            },
          ],
        },
        {
          id: 2,
          name: 'g52',
          team_image_url: 'http://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
          created_at: '2016-06-26T14:26:16.000Z',
          updated_at: '2016-06-26T14:26:16.000Z',
          users: [
            {
              id: 4,
              user_name: 'ham-dawg',
              first_name: 'Hamid',
              last_name: 'Aghdaee',
              profile_image_url: 'https://ca.slack-edge.com/T1T555TL0-U3AQUK7GS-9df641a8d4bf-512',
              email: 'h@mid.com',
              hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
              created_at: '2017-04-24T10:23:16.000Z',
              updated_at: '2017-04-24T10:23:16.000Z',
              _pivot_id: 5,
              _pivot_team_id: 2,
              _pivot_user_id: 4,
            },
          ],
        },
        {
          id: 3,
          name: 'g Web Instructors',
          team_image_url: 'http://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
          created_at: '2016-06-26T14:26:16.000Z',
          updated_at: '2016-06-26T14:26:16.000Z',
          users: [
            {
              id: 4,
              user_name: 'ham-dawg',
              first_name: 'Hamid',
              last_name: 'Aghdaee',
              profile_image_url: 'https://ca.slack-edge.com/T1T555TL0-U3AQUK7GS-9df641a8d4bf-512',
              email: 'h@mid.com',
              hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
              created_at: '2017-04-24T10:23:16.000Z',
              updated_at: '2017-04-24T10:23:16.000Z',
              _pivot_id: 6,
              _pivot_team_id: 3,
              _pivot_user_id: 4,
            },
          ],
        }
      ], done);
      // end of expect statement
  });
  // get all teams test
  it('should POST /teams with a status code of 200', (done) => {
    agent
      .post('/teams')
      .expect(200, done);
  });
  it('should POST /teams with a Content-Type of application/json', (done) => {
    agent
      .post('/teams')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/, done);
  });
  it('should respond to POST /teams', (done) => {
    agent
          .post('/teams')
          .set('Accept', 'application/json')
          .send({
            name: 'Exponentials',
            team_image_url: 'https://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
          })
          .set('Content-Type', /application\/json/)
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
});
