exports.up = knex => knex.schema.createTable('users_exercises_images', (table) => {
  table.increments('id').primary();
  table.integer('image_id').notNullable().references('id').inTable('images');
  table.integer('user_id').notNullable().references('id').inTable('users');
  table.integer('exercise_id').notNullable().references('id').inTable('exercises');
  table.integer('exercise_num_total').notNullable();
  table.boolean('logged_results').defaultTo('false');
});

exports.down = knex => knex.schema.dropTable('users_exercises_images');
