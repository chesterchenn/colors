// Font-Style Sequelize Model
const Sequelize = require('sequelize');
const config = require('../../config/mysql');

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mariadb',
  define: {
    timestamps: false,
  },
});

class FontStyle extends Sequelize.Model {}

FontStyle.init({
  font_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
