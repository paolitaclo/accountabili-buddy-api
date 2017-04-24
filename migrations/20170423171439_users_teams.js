exports.up = knex => knex.schema.createTable('users_teams', (table) => {
  table.increments('id').primary();
  table.integer('user_id').notNullable().references('id').inTable('users');
  table.integer('team_id').notNullable().references('id').inTable('teams');
});

exports.down = knex => knex.schema.dropTable('users_teams');
