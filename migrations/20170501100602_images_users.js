exports.up = knex => knex.schema.createTable('images_users', (table) => {
  table.increments('id').primary();
  table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
  table.integer('image_id').notNullable().references('id').inTable('images');
});

exports.down = knex => knex.schema.dropTable('images_users');
