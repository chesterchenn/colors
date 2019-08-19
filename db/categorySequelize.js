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
  cname: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'c_name'
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    field: 'created_at',
  }
}, {
  tableName: 'category',
  sequelize,
});

module.exports = Category;
