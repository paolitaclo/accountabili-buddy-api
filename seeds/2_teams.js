
exports.seed = (knex) => {
  return knex('teams').del()
    .then(() => knex('teams').insert([
      {
        id: 1,
        name: 'g42',
        team_image_url: 'https://media.glassdoor.com/sqll/825775/galvanize-squarelogo-1429039425588.png',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },
      {
        id: 2,
        name: 'g52',
        team_image_url: 'https://media.glassdoor.com/sqll/825775/galvanize-squarelogo-1429039425588.png',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },
      {
        id: 3,
        name: 'g Web Instructors',
        team_image_url: 'https://media.glassdoor.com/sqll/825775/galvanize-squarelogo-1429039425588.png',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }
    ]))
    .then(() => knex.raw("SELECT setval('teams_id_seq', (SELECT MAX(id) FROM teams))")
  );
};
