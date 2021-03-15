module.exports = {
  Host: 'localhost',
  USER: 'root',
  PASSWORD: '',
  DB: 'mnart',
  dialect: 'mysql',
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
