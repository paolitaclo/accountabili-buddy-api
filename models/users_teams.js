import Bookshelf from '../bookshelf';

require('./teams');
require('./users');

const UsersTeams = Bookshelf.Model.extend({
  tableName: 'users_teams',
  hasTimestamps: true,
  team: () => this.belongsToMany('Teams'),
  user: () => this.belongsToMany('Users')
});

export default Bookshelf.model('UsersTeams', UsersTeams);
