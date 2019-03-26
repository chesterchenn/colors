// Font-Style Sequelize Model
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
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
  }
}, {
  tableName: 'font_style',
  sequelize,
});

module.exports = FontStyle;
