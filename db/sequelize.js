const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mariadb',
  dialectOptions: {
    timezone: config.timezone,
  },
  define: {
    timestamps: false,
  },
  logging: false,
});

module.exports = sequelize;
