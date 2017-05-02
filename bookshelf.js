const knex = require('./knex');
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('visibility');
bookshelf.plugin(require('bookshelf-transaction-manager'));

module.exports = bookshelf;
