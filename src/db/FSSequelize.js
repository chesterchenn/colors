const Sequelize = require('sequelize');
const config = require('../../config/mysql');

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mariadb',
})

class FontStyle extends Sequelize.Model {}

FontStyle.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
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
    allowNull: false
  }
}, {
  tableName: 'font_style',
  sequelize
})

module.exports = FontStyle;
