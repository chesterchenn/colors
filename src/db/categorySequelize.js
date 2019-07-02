// Category Sequelize Model
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
class Category extends Sequelize.Model {}

Category.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  c_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  }
}, {
  tableName: 'category',
  sequelize,
});

module.exports = Category;
