// Category Sequelize Model
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
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
    validate: {
      isUnique(value, next) {
        Colors.findOne({
          where: { color_hex: value },
          // attributes: ['id']
        }).done((instance) => {
          if (instance) {
            return next('颜色Hex已经存在');
          }
          next();
        });
      }
    }
  },
  color_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  color_order: {
    type: Sequelize.STRING,
    defaultValue: 999,
  },
  color_zh_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  }
}, {
  indexes: [{
    unique: true,
    fields: ['color_hex']
  }],
  tableName: 'colors',
  sequelize,
});

module.exports = Colors;
