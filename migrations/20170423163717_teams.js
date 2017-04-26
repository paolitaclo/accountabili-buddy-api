exports.up = knex => knex.schema.createTable('teams', (table) => {
  table.increments('id').primary();
  table.string('name').notNullable().defaultTo('');
  table.string('team_image_url').notNullable().defaultTo('');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('teams');
