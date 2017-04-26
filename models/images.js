const Bookshelf = require('../bookshelf');

require('./users');

const Images = Bookshelf.Model.extend({
  tableName: 'images',
  user: function () {
    return this.belongsTo('Users');
  }
});

module.exports = Bookshelf.model('Images', Images);
