// Category Sequelize Model
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
class Colors extends Sequelize.Model {}

Colors.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  hex: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  c_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  }
}, {
  indexes: [{
    unique: true,
    fields: ['hex']
  }],
  tableName: 'colors',
  sequelize,
});

module.exports = Colors;
