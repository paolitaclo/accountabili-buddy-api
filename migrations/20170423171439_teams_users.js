exports.up = knex => knex.schema.createTable('teams_users', (table) => {
  table.increments('id').primary();
  table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
  table.integer('team_id').notNullable().references('id').inTable('teams');
  table.boolean('primary_team').notNullable().defaultTo('true');
});

exports.down = knex => knex.schema.dropTable('teams_users');
