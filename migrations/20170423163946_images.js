exports.up = knex => knex.schema.createTable('images', (table) => {
  table.increments('id').primary();
  table.integer('user_id').notNullable().references('id').inTable('users');
  table.text('caption').defaultTo('');
  table.string('ImageUrl').notNullable();
});

exports.down = knex => knex.schema.dropTable('images');
