// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/bilibuddy_dev',
    debug: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/bilibuddy_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
