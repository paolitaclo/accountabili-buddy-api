exports.up = knex => knex.schema.createTable('images', (table) => {
  table.increments('id').primary();
  table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
  table.text('caption').defaultTo('');
  table.string('imageUrl').notNullable();
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('images');
