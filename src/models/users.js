import Bookshelf from '../bookshelf';

require('./teams');
require('./users_teams');
require('./images');
require('./exercises');
require('./users_exercises_images');

const Users = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  teams: () => this.belongsToMany('Teams').through('UsersTeams'),
  images: () => this.hasMany('Images'),
  exercises: () => this.belongsToMany('Exercises').through('UsersExercisesImages'),
  // usersExercisesImages: () => this.hasMany('UsersExercisesImages')
});

export default Bookshelf.model('Users', Users);
