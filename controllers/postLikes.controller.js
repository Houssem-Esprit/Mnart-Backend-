/* eslint-disable prettier/prettier */
const con = require('../config/dbConnection');

module.exports = {
  addLike: async (req, res) => {
    // const { idUser,idCategory,title,description,price } = req.body;
    const { idpost, iduser, ischecked } = req.body;
    const idOwner = req.body.idownerr;
    const dateCreation = new Date().getTime().toString();
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      let sql = "INSERT INTO postlikes (idPost,idPostOwner,idUser,isNotifChecked,date) VALUES('idPostt','idpostownerrr','idUserr','isChecked','dateCre')";
      sql = sql.replace('idPostt', idpost);
      sql = sql.replace('idpostownerrr', idOwner);
      sql = sql.replace('idUserr', iduser);
      sql = sql.replace('isChecked', ischecked);
      sql = sql.replace('dateCre', dateCreation);
      await connection.query(sql, (err, result) => {
        if (err) throw err;

        res.json({
          postInformation: 'Like added',
        });
      });
      connection.release();
    });
  },

  Unlike: async (req, res) => {
    const postID = req.params.idpost;
    const userID = req.params.idUser;

    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `DELETE FROM \`postlikes\` WHERE postlikes.idPost =${postID} AND postlikes.idUser =${userID}`;
      await connection.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
      });
      connection.release();
    });
  },

  getLikesByPost: async (req, res) => {
    const postID = req.body.idpost;
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `SELECT COUNT(*) as likes FROM \`postlikes\` WHERE postlikes.idPost =${postID}`;
      await connection.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result[0]);
      });
      connection.release();
    });
  },

  isLikeButtonChecked: async (req, res) => {
    const postID = req.body.idpost;
    const userID = req.body.iduser;
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `SELECT * FROM \`postlikes\` WHERE postlikes.idPost =${postID} AND postlikes.idUser =${userID}`;
      await connection.query(sql, (err, result) => {
        if (err) throw err;
        if (!result[0]) res.send('false');
        if (result[0]) res.send('true');
        // res.json(result[0]);
      });
      connection.release();
    });
  },

  getNotifications: async (req, res) => {
    con.getConnection(async (err, connection) => {
      if (err) throw err;
      const sql = 'SELECT plike.id as likeID, u.id as userID, u.firstName, u.lastName, u.image,p.idpost, p.title, plike.date, plike.isNotifChecked, c.id as idCategory FROM postlikes as plike INNER JOIN user as u ON u.id = plike.idUser INNER JOIN post as p ON p.idpost = plike.idPost INNER JOIN category c ON c.id = p.idCategory ORDER BY plike.date DESC, plike.isNotifChecked=1 DESC ';
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json(result);
      });
      connection.release();
    });
  },

  updateNotifState: async (req, res) => {
    const postLikedID = req.body.idpostLiked;

    con.getConnection(async (err, connection) => {
      if (err) throw err;
      const sql = `UPDATE postlikes SET isNotifChecked=1 WHERE id=${postLikedID}`;
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json({ userMessage: 'notification state updated' });
      });
      connection.release();
    });
  },

  getLikessByPost: async (req, res) => {
    const { idPost } = req.body;
    con.getConnection((err, connection) => {
      if (err) throw err;

      const sql = `SELECT p.id, p.idPost, p.idPostOwner, p.idUser , p.date AS timestamp, u.firstName, u.lastName,u.image
      FROM postlikes as p, user as u 
      WHERE p.idUser=u.id AND p.idPost=${idPost}`;

      connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
      });
      connection.release();
    });
  },

};
