/* question model*/
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Qcategory = require('./Qcategory');
class Question extends Sequelize.Model {}

Question.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  answer: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  category: {
    type: Sequelize.INTEGER,
    references: {
      model: Qcategory,
      key: 'id',
    },
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    field: 'created_at',
  }
}, {
  tableName: 'question',
  sequelize,
});

module.exports = Question;
