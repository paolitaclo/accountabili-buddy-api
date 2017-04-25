import Bookshelf from '../bookshelf';

require('./users');

const Images = Bookshelf.Model.extend({
  tableName: 'images',
  user: () => this.belongsTo('Users')
});

export default Bookshelf.model('Images', Images);
