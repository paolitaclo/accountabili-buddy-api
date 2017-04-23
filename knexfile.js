// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/DATABASE_NAME_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/DATABASE_NAME_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
