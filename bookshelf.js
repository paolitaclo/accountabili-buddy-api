const knex = require('./knex');
const bookshelf = require('bookshelf')(knex);

bookshelf.plugiin('registry');
bookshelf.plugin('visibility');

export default bookshelf;
