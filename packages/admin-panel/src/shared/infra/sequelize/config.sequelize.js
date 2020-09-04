// import { Dialect } from 'sequelize/types';
// const { Dialect } = require('sequelize/types');

module.exports = {
  development: {
    host: process.env.DB_HOST || 'db',
    dialect: 'mysql',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'main_development',
    define: {
      timestamp: true,
      underscored: true,
      underscoredAll: true
    }
    // repositoryMode: true,
  }
};
