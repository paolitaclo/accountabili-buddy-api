const Bookshelf = require('../bookshelf');

require('./teams');
require('./users_teams');
require('./images');
require('./exercises');
require('./users_exercises_images');

const Users = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  hidden: ['hashed_password'],
  teams: function () {
    return this.belongsToMany('Teams').through('UsersTeams');
  },
  images: function () {
    return this.hasMany('Images');
  },
  exercises: function () {
    return this.belongsToMany('Exercises').through('UsersExercisesImages');
  },
  usersExercisesImages: function () {
    return this.hasMany('UsersExercisesImages');
  }
  // usersExercisesImages: () => this.hasMany('UsersExercisesImages')
});

module.exports = Bookshelf.model('Users', Users);
