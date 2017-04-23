
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    // fill in the magic
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
