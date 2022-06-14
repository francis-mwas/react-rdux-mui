require('dotenv').config();

console.log('db port is here: ', process.env.DB_PORT);
module.exports = {
  development: {
    database: 'schoolManagement',
    username: 'postgres',
    password: 'mwas',
    host: '127.0.0.1',
    port: '5430',
    dialect: 'postgres',
  },

  test: {
    database: 'schoolManagement',
    username: 'postgres',
    password: 'mwas',
    host: '127.0.0.1',
    port: '5430',
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
