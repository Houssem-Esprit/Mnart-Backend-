'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //queryInterface allows to create tables, columns, and interacting with database
   return queryInterface.createTable("user",{
    idUser:{
        type: Sequelize.INTEGER(11),
        allwoNull:false,
        autoIncrument: true,
        autoIncrument:1,
        primaryKey: true

    },
    firstName:{
        type: Sequelize.STRING(300)
    },
    lastName:{
        type: Sequelize.STRING(300)
    },
    email:{
        type: Sequelize.STRING(300)
    },
    password:{
        type:Sequelize.STRING(2000)
    },
    image:{
        type:Sequelize.STRING,
        allwoNull: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
  freezeTableName: true
});
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.dropTable("user");
  }
};
