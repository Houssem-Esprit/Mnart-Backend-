'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("category",{
      idCategory:{
        type: Sequelize.INTEGER(11),
        allwoNull:false,
        autoIncrument: true,
        autoIncrument:1,
        primaryKey: true
      },
      categoryName:{
          type: Sequelize.STRING()
      },
      categoryImg:{
        type:Sequelize.STRING(),
        allwoNull: true
    },
 
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
  },{
      freezeTableName: true
  });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("category");
  
  }
};
