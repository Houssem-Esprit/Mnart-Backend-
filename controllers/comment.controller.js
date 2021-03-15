/* eslint-disable prettier/prettier */
const { check, validationResult } = require('express-validator/check');
const con = require('../config/dbConnection');

[
  check('comnt').exists().trim()
    .escape()
    .withMessage('comment contains a suspicious content'),
];

module.exports = {
  addComment: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      const {
        idUser, idPost, comnt,
      } = req.body;
      const dateCom = new Date().getTime().toString();

      con.getConnection(async (err, connection) => {
        if (err) throw err;

        let sql = "INSERT INTO comment(id_user,id_post,comment,timestamp) VALUES('iduser','idpost','commnt','date')";
        sql = sql.replace('iduser', idUser);
        sql = sql.replace('idpost', idPost);
        sql = sql.replace('commnt', comnt);
        sql = sql.replace('date', dateCom);

        await connection.query(sql, (err, result, fields) => {
          if (err) throw err;

          res.json({
            postInformation: 'Post added',
          });
        });
        connection.release();
      });
    }
  },

  countComments: async (req, res) => {
    const { idpost } = req.body;
    con.getConnection((err, connection) => {
      if (err) throw err;

      const sql = `SELECT COUNT(er.comment) as nbrComs FROM comment er WHERE id_post=${idpost}`;

      connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.json(result[0]);
      });
      connection.release();
    });
  },

  getCommentsByPost: async (req, res) => {
    const { idPost } = req.body;
    con.getConnection((err, connection) => {
      if (err) throw err;

      const sql = `SELECT c.id_comment, c.id_user, c.id_post, c.comment,c.timestamp, u.firstName, u.lastName,u.image, (SELECT COUNT(s.comment) as nbrsubComnts FROM subcomment s WHERE s.id_comment_ref = c.id_comment ) as nbrsubComnts 
      FROM comment as c, user as u 
      WHERE c.id_user=u.id AND id_post=${idPost}`;

      connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
      });
      connection.release();
    });
  },
};
