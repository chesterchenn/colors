// Category Sequelize Model
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
class Category extends Sequelize.Model {}

Category.init({
  cate_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cate_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cate_zh_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE
  }
}, {
  tableName: 'category',
  sequelize
});

module.exports = Category;
