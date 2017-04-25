import Bookshelf from '../bookshelf';

require('./teams');
require('./images');
require('./exercises');

const Users = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  team: () => this.belongsToMany('Teams'),
  image: () => this.hasMany('Images'),
  exercise: () => this.hasMany('Exercises')
});

export default Bookshelf.model('Users', Users);
