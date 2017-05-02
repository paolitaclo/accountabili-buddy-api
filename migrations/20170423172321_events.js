exports.up = knex => knex.schema.createTable('events', (table) => {
  table.increments('id').primary();
  table.integer('image_id').notNullable().references('id').inTable('images');
  table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
  table.integer('reps').notNullable();
  table.timestamps(true, true);
  table.integer('team_id').nullable().references('id').inTable('teams');
});

exports.down = knex => knex.schema.dropTable('events');
