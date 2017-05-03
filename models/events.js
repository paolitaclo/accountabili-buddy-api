const Bookshelf = require('../bookshelf');

require('./teams');
require('./images');
require('./users');

const Events = Bookshelf.Model.extend({
  tableName: 'events',
  hasTimestamps: true,
  // teams: function () {
  //   return this.belongsToMany('Teams');
  // },
  images: function () {
    return this.belongsTo('Images');
  },
  user: function () {
    return this.belongsTo('Users');
  }
});

module.exports = Bookshelf.model('Events', Events);
