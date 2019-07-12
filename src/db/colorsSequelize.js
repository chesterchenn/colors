// Colors Sequelize Model
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Category = require('./categorySequelize');
class Colors extends Sequelize.Model {}

Colors.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  hex: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args:true,
      msg: 'Hello from hex.'
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cname: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'c_name',
  },
  fontColor: {
    type: Sequelize.BOOLEAN,
    defaultValue: 1,
    field: 'font_color',
  },
  categoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
    field: 'category_id'
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    field: 'created_at'
  }
}, {
  indexes: [{
    unique: true,
    fields: ['hex']
  }],
  tableName: 'colors',
  sequelize,
});

module.exports = Colors;
