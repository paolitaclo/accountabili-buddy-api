import Bookshelf from '../bookshelf';

require('./users');
require('./users_teams');

const Teams = Bookshelf.Model.extend({
  tableName: 'teams',
  users: () => this.belongsToMany('Users').through('UsersTeams')
});

export default Bookshelf.model('Teams', Teams);
