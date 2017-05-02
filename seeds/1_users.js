
exports.seed = (knex) => {
  return knex('users').del()
    .then(() => knex('users').insert([
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
        email: 'paolita.claros+test@gmail.com',
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
      {
        id: 5,
        user_name: 'lunalunera',
        first_name: 'Luna',
        last_name: 'Claros',
        profile_image_url: 'https://www.instagram.com/p/BOnxqlvhtcO/?hl=en',
        email: 'homecastellanos@gmail.com',
        hashed_password: '$2a$12$.dnYZHmtSqks3kie/5M5ruymcMYHGj67g35fPtXsyK7VtCd/ZUrFy',
        created_at: new Date('2017-04-24 10:23:16 UTC'),
        updated_at: new Date('2017-04-24 10:23:16 UTC')
      },
      {
        id: 6,
        user_name: 'nicocl',
        first_name: 'Nicolas',
        last_name: 'Claros',
        profile_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.pngn',
        email: 'n_claros@hotmail.com',
        hashed_password: '$2a$12$q0fpSw8v0t/Ou7nhCkvUe.F1PdPwAsDnvXtjkMZijy5MBNE2Bfubq',
        created_at: new Date('2017-04-24 10:23:16 UTC'),
        updated_at: new Date('2017-04-24 10:23:16 UTC')
      }
    ])
    )
    .then(() => knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
  );
};
