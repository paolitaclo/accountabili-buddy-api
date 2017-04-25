import Bookshelf from '../bookshelf';

require('./users');
require('./users_exercises_images');


const Exercises = Bookshelf.Model.extend({
  tableName: 'exercises',
  users: () => this.belongsToMany('Users').through('UsersExercisesImages')
});

export default Bookshelf.model('Exercises', Exercises);
