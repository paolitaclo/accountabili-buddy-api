
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('teams').del()
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert([
        {
          id: 1,
          name: 'g42',
          team_image_url: 'http://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        },
        {
          id: 2,
          name: 'g52',
          team_image_url: 'http://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        },
        {
          id: 3,
          name: 'g Web Instructors',
          team_image_url: 'http://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-g.svg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }
      ]);
    })
    .then(() => {
          return knex.raw("SELECT setval('teams_id_seq', (SELECT MAX(id) FROM teams))");
    })
};
