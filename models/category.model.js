const Sequelize = require('sequelize');
const sequelize = require('./connection').sequelize;


module.exports = sequelize.define("category",{
    categoryName:{
        type: Sequelize.STRING()
    },
    categoryImg:{
        type:Sequelize.STRING(),
        allwoNull: true
    },
    
},{
    freezeTableName: true
});