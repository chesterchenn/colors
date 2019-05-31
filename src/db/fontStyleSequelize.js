// Font-Style Sequelize Model
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Colors = require('./colorsSequelize');
class FontStyle extends Sequelize.Model {}

FontStyle.init({
  font_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  font_color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  font_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  font_zh_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  }
}, {
  tableName: 'font_style',
  sequelize,
});

FontStyle.hasMany(Colors, { foreignKey: 'font_id', constraints: false, });

module.exports = FontStyle;
