const Bookshelf = require('../bookshelf');

require('./teams');
require('./users');

const TeamsUsers = Bookshelf.Model.extend({
  tableName: 'teams_users',
  hasTimestamps: true,
  teams: function () {
    return this.hasMany('Teams');
  },
  users: function () {
    return this.hasMany('Users');
  }
});

module.exports = Bookshelf.model('TeamsUsers', TeamsUsers);
