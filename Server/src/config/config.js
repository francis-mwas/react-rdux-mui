require('dotenv').config();

console.log('db port is here: ', process.env.DB_PORT);
module.exports = {
  development: {
    database: 'schoolManagement',
    username: '',
    password: '',
    host: '127.0.0.1',
    port: '',
    dialect: 'postgres',
  },

  test: {
    database: 'schoolManagement',
    username: '',
    password: '',
    host: '127.0.0.1',
    port: '',
    dialect: 'postgres',
  },

  production: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    ssl: true,
  },
  dialectOptions: {
    ssl: true,
  },
};
