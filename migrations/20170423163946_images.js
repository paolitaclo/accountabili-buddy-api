exports.up = knex => knex.schema.createTable('images', (table) => {
  table.increments('id').primary();
  table.text('caption').defaultTo('');
  table.string('imageUrl').notNullable();
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('images');
