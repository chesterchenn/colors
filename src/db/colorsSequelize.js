// Colors Sequelize Model
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Category = require('./categorySequelize');
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
  category_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: 'id',
    }
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
