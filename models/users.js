const Bookshelf = require('../bookshelf');

require('./teams');
require('./teams_users');
require('./images');
require('./events');

const Users = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  hidden: ['hashed_password'],
  teams: function () {
    return this.belongsToMany('Teams').through('TeamsUsers');
  },
  taggedImages: function () {
    return this.belongsToMany('Images');
  },
  ownedImages: function () {
    return this.belongsToMany('Images').through('Events');
  },
  events: function () {
    return this.hasMany('Events');
  }
});

module.exports = Bookshelf.model('Users', Users);
