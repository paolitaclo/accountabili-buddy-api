const Bookshelf = require('../bookshelf');

require('./users');
require('./events');

const Images = Bookshelf.Model.extend({
  tableName: 'images',
  taggedUsers: function () {
    return this.belongsToMany('Users');
  },
  ownedUsers: function () {
    return this.belongsToMany('Users').through('Events');
  },
  events: function () {
    return this.hasMany('Events');
  }
});

module.exports = Bookshelf.model('Images', Images);
