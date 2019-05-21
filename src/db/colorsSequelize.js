// Category Sequelize Model
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const FontStyle = require('./fontStyleSequelize');
const Category = require('./categorySequelize');
class Colors extends Sequelize.Model {}

Colors.init({
  color_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  color_hex: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  color_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  color_order: {
    type: Sequelize.STRING,
    defaultValue: 999,
  },
  font_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: FontStyle,
      key: 'font_id'
    }
  },
  color_zh_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cate_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: Category,
      key: 'cate_id',
    }
  },
  created_at: {
    type: Sequelize.DATE
  }
}, {
  tableName: 'colors',
  sequelize
});

module.exports = Colors;
