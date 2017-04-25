import Bookshelf from '../bookshelf';

require('./users');

const Teams = Bookshelf.Model.extend({
  tableName: 'teams',
  user: () => this.hasMany('Users')
});

export default Bookshelf.model('Teams', Teams);
