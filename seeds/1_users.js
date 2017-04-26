
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then( () => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          user_name: 'klam',
          first_name: 'Kevin',
          last_name: 'Lam',
          profile_image_url: 'https://pbs.twimg.com/profile_images/842876355800788992/bQ4YV83U_400x400.jpg',
          email: 'klamklam@gahbo.com',
          hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
          created_at: new Date('2017-04-24 10:21:16 UTC'),
          updated_at: new Date('2017-04-24 10:21:16 UTC')
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
          updated_at: new Date('2017-04-24 10:22:16 UTC')
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
          updated_at: new Date('2017-04-24 10:23:16 UTC')
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
          updated_at: new Date('2017-04-24 10:23:16 UTC')
        },

      ]);
    })
    .then(()=>{
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
