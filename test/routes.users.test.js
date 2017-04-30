'use strict';

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

    it('should respond with an array of all users with their relationships', (done) => {
      agent.get('/users').set('Accept', 'application/json').expect(
        [
          {
            id: 1,
            user_name: 'klam',
            first_name: 'Kevin',
            last_name: 'Lam',
            profile_image_url: 'https://pbs.twimg.com/profile_images/842876355800788992/bQ4YV83U_400x400.jpg',
            email: 'klamklam@gahbo.com',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
            created_at: new Date('2017-04-24 10:21:16 UTC'),
            updated_at: new Date('2017-04-24 10:21:16 UTC'),
            teams: [
              {
                id: 1,
                name: 'g42',
                team_image_url: 'http://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
                created_at: new Date('2016-06-26 14:26:16 UTC'),
                updated_at: new Date('2016-06-26 14:26:16 UTC'),
                _pivot_id: 1,
                _pivot_team_id: 1,
                _pivot_user_id: 1
              }
            ],
            images: [
              {
                id: 1,
                user_id: 1,
                caption: 'Woooo pushup hour at the gSchool',
                imageUrl: 'https://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg',
                created_at: new Date('2017-04-24 10:23:16 UTC'),
                updated_at: new Date('2017-04-24 10:23:16 UTC'),
                _pivot_id: 1,
                _pivot_image_id: 1,
                _pivot_user_id: 1
              }
            ]
          },
          {
            id: 2,
            user_name: 'paolita',
            first_name: 'Paola',
            last_name: 'Claros',
            profile_image_url: 'https://pbs.twimg.com/profile_images/832357648884342784/ZDEXxcfN_400x400.jpg',
            email: 'paolita@claros.com',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
            created_at: new Date('2017-04-24 10:22:16 UTC'),
            updated_at: new Date('2017-04-24 10:22:16 UTC'),
            teams: [
              {
                id: 1,
                name: 'g42',
                team_image_url: 
              }
            ],
            images: [
              {

              }
            ]
          },
          {
            id: 3,
            user_name: 'mez',
            first_name: 'Mary',
            last_name: 'Lai',
            profile_image_url: 'https://pbs.twimg.com/profile_images/854522454177226752/_PExneEw_400x400.jpg',
            email: 'mez@lychee.com',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
            created_at: new Date('2017-04-24 10:23:16 UTC'),
            updated_at: new Date('2017-04-24 10:23:16 UTC'),
            teams: [
              {

              }
            ],
            images: [
              {

              }
            ]
          },
          {
            id: 4,
            user_name: 'ham-dawg',
            first_name: 'Hamid',
            last_name: 'Aghdaee',
            profile_image_url: 'https://ca.slack-edge.com/T1T555TL0-U3AQUK7GS-9df641a8d4bf-512',
            email: 'h@mid.com',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
            created_at: new Date('2017-04-24 10:23:16 UTC'),
            updated_at: new Date('2017-04-24 10:23:16 UTC'),
            teams: [
              {

              }
            ],
            images: [
              {

              }
            ]
          }
        ], done);

    })
  })
})
