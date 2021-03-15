const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');



const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD, {
    host:dbConfig.Host,
    dialect:dbConfig.dialect,
    operatorsAliases:false,


    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }        
});


/* const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user= require('./user.model')(sequelize,Sequelize);  */


module.exports = {sequelize};
global.sequelize = sequelize;