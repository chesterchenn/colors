/* question category model*/
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
class Qcategory extends Sequelize.Model {}

Qcategory.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    field: 'created_at',
  }
}, {
  tableName: 'question_category',
  sequelize,
});

module.exports = Qcategory;
