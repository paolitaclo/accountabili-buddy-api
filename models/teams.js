import Bookshelf from '../bookshelf';

require('./users');

const Teams = Bookshelf.Model.extend({
  tableName: 'teams',
  users: () => this.belongsTo('Users')
});
