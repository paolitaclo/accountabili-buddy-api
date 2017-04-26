const Bookshelf = require('../bookshelf');

require('./users');
require('./users_teams');

const Teams = Bookshelf.Model.extend({
  tableName: 'teams',
  users: function() {
    return this.belongsToMany('Users').through('UsersTeams');
  }
});

module.exports = Bookshelf.model('Teams', Teams);
