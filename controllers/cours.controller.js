/* eslint-disable prettier/prettier */
const con = require('../config/dbConnection');

module.exports = {
  create: async (req, res) => {
    // const { idUser,idCategory,title,description,price } = req.body;
    const idUser = parseInt(req.body.idUser);
    const idCat = parseInt(req.body.idCategoryCours);
    const { title } = req.body;
    const { description } = req.body;
    const views = parseInt(req.body.views);
    const date = new Date().getTime().toString();

    con.getConnection(async (err, connection) => {
      if (err) throw err;
      //
      /*

            */

      let sql = "INSERT INTO cours(idUserCours,idCategoryCours,title,description,date,views,video) VALUES('idUserr','idcats','titlee','descriptionn','datee','viewss','videos')";
      sql = sql.replace('idUserr', idUser);
      sql = sql.replace('idcats', idCat);
      sql = sql.replace('titlee', title);
      sql = sql.replace('descriptionn', description);
      sql = sql.replace('datee', date);
      sql = sql.replace('viewss', views);
      sql = sql.replace('videos', req.file.filename);

      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json({
          coursInformation: 'cour added',
        });
      });
      connection.release();
    });
  },

  getAllCours: async (req, res) => {
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = 'SELECT * FROM `cours` ';

      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json(result);
      });
      connection.release();
    });
  },

  getCoursPost: async (req, res) => {
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = 'SELECT c.idCours, u.image, u.firstName, u.lastName, c.date , c.title , c.description, c.video, c.views FROM cours as c INNER JOIN user as u on u.id = c.idUserCours';
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
      });
      connection.release();
    });
  },

  updateViews: async (req, res) => {
    const { idCours } = req.body;

    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `UPDATE cours SET views=views + 1 WHERE idCours=${idCours}`;
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.json({ userMessage: 'views updated' });
      });
      connection.release();
    });
  },
};
