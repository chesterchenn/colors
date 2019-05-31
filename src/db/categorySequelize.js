// Category Sequelize Model
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Colors = require('./colorsSequelize');
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
    type: Sequelize.DATE,
    defaultValue: new Date(),
  }
}, {
  tableName: 'category',
  sequelize
});

Category.hasMany(Colors, { foreignKey: 'cate_id', constraints: false, });

module.exports = Category;
