
exports.seed = (knex) => {
  return knex('events').del()
    .then(() => knex('events').insert([
      {
        id: 1,
        image_id: 1,
        user_id: 1,
        reps: 20,
        team_id: 1,
        created_at: new Date('2017-04-24 10:22:16 UTC'),
        updated_at: new Date('2017-04-24 10:22:16 UTC')
      },
      {
        id: 2,
        image_id: 1,
        user_id: 2,
        reps: 30,
        team_id: 1,
        created_at: new Date('2017-04-24 10:22:16 UTC'),
        updated_at: new Date('2017-04-24 10:22:16 UTC')
      },
      {
        id: 3,
        image_id: 1,
        user_id: 3,
        reps: 32,
        team_id: 1,
        created_at: new Date('2017-04-24 10:22:16 UTC'),
        updated_at: new Date('2017-04-24 10:22:16 UTC')
      },
      {
        id: 4,
        image_id: 1,
        user_id: 4,
        reps: 40,
        team_id: 1,
        created_at: new Date('2017-04-24 10:22:16 UTC'),
        updated_at: new Date('2017-04-24 10:22:16 UTC')
      },
      {
        id: 5,
        image_id: 1,
        user_id: 1,
        reps: 45,
        team_id: 1,
        created_at: new Date('2017-04-24 10:22:16 UTC'),
        updated_at: new Date('2017-04-24 10:22:16 UTC')
      },
    ]))
    .then(() => knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events))")
  );
};
