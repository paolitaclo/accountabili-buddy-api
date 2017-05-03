const Bookshelf = require('../bookshelf');

require('./users');
require('./teams_users');

const Teams = Bookshelf.Model.extend({
  tableName: 'teams',
  users: function() {
    return this.belongsToMany('Users').through('TeamsUsers');
  }
});

module.exports = Bookshelf.model('Teams', Teams);
