import Bookshelf from '../bookshelf';

require('./teams');

const Users = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  team: () => this.hasMany('Teams')
});

export default Bookshelf.model('Users', Users);
