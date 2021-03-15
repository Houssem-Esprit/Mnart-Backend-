const Sequelize = require('sequelize');
const { sequelize } = require('./connection');

/* idUser:{
    type: Sequelize.INTEGER(11),
    allwoNull:false,
    autoIncrument: true,
    primaryKey: true

}, */

module.exports = sequelize.define(
  'user',
  {
    firstName: {
      type: Sequelize.STRING(300),
    },
    lastName: {
      type: Sequelize.STRING(300),
    },
    email: {
      type: Sequelize.STRING(300),
    },
    password: {
      type: Sequelize.STRING(2000),
    },
    image: {
      type: Sequelize.STRING,
      allwoNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
