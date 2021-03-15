/* eslint-disable prettier/prettier */
const mysql = require('mysql');

const con = mysql.createPool({
  connectionLimit: 100,
  multipleStatements: true,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mnart',
});

module.exports = con;
