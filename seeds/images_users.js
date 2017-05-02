
exports.seed = (knex) => {
  return knex('images_users').del()
    .then(() => {
      return knex('images_users').insert([
        {
          id: 1,
          user_id: 2,
          image_id: 1
        },
        {
          id: 2,
          user_id: 3,
          image_id: 1
        },
        {
          id: 3,
          user_id: 4,
          image_id: 1
        }
      ]);
    })
    .then(() => knex.raw("SELECT setval('images_users_id_seq', (SELECT MAX(id) FROM images_users))")
  );
};
