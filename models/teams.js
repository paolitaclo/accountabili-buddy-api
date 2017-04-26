const Bookshelf = require('../bookshelf');

require('./users');
require('./users_teams');

const Teams = Bookshelf.Model.extend({
  tableName: 'teams',
<<<<<<< HEAD
  users: function() {
    return this.belongsToMany('Users').through('UsersTeams');
  }
});
||||||| merged common ancestors
  users: () => this.belongsToMany('Users').through('UsersTeams')
});
=======
  users: function() {
    return this.belongsToMany('Users').through('UsersTeams');
}
})
>>>>>>> 3233d52016d3915513161df8e93141ee1cc6b02c

module.exports = Bookshelf.model('Teams', Teams);
