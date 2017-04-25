import Bookshelf from '../bookshelf';

require('./users');

const Exercises = Bookshelf.Model.extend({
  tableName: 'exercises',
  user: () => this.hasMany('Users') // hasMany or belongsToMany??
});

export default Bookshelf.model('Exercises', Exercises);
