/* eslint-disable prettier/prettier */
const { check, validationResult } = require('express-validator/check');
const con = require('../config/dbConnection');

[
  check('comnt').exists().trim()
    .escape()
    .withMessage('comment contains a suspicious content'),
];

module.exports = {
  addSubComment: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      const {
        idUser_Cmnt_Owner, idComnt, idUser_Cmnter, comnt,
      } = req.body;
      const dateCom = new Date().getTime().toString();

      con.getConnection(async (err, connection) => {
        if (err) throw err;

        let sql = "INSERT INTO subcomment(id_comment_ref,id_user_comment_owner,id_user_commenter,comment,timestamp) VALUES('idcomment','iduserOwner','iduserComnter','commnt','date')";
        sql = sql.replace('idcomment', idComnt);
        sql = sql.replace('iduserOwner', idUser_Cmnt_Owner);
        sql = sql.replace('iduserComnter', idUser_Cmnter);
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

  countsubComments: async (req, res) => {
    const { idUser_Cmnt_Owner, idComnt } = req.body;
    con.getConnection((err, connection) => {
      if (err) throw err;

      const sql = `SELECT COUNT(er.comment) as nbrComs FROM subcomment er WHERE er.id_comment_ref=${idComnt} AND er.id_user_comment_owner=${idUser_Cmnt_Owner}`;

      connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.json(result[0]);
      });
      connection.release();
    });
  },

  getsubCommentsPerUser: async (req, res) => {
    const { idUser_Cmnt_Owner, idComnt } = req.body;
    con.getConnection((err, connection) => {
      if (err) throw err;

      const sql = `SELECT c.id_subComment,c.id_comment_ref, c.id_user_comment_owner, c.id_user_commenter, c.comment,c.timestamp, u.firstName, u.lastName,u.image FROM subcomment c, user u  WHERE c.id_user_commenter=u.id AND c.id_user_comment_owner=${
        idUser_Cmnt_Owner} AND c.id_comment_ref=${idComnt}`;

      connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
      });
      connection.release();
    });
  },

  getalltest: async (req, res) => {
    // const { idUser_Cmnt_Owner, idComnt } = req.body;
    con.getConnection((err, connection) => {
      if (err) throw err;

      const sql = `SELECT c.* , u.*,
      sc.*, ur.*
      FROM comment c, subcomment sc, user u, user ur
      WHERE c.id_comment = sc.id_comment_ref AND c.id_user = u.id AND sc.id_user_comment_owner = c.id_user AND sc.id_user_commenter = ur.id    
      `;

      connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
      });
      connection.release();
    });
  },
};
