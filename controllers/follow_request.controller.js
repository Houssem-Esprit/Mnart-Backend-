/* eslint-disable prettier/prettier */
const con = require('../config/dbConnection');

module.exports = {

  followRequest: async (req, res) => {
    const { idUserRequest, idUserToRespond } = req.body;
    const dateCreation = new Date().getTime().toString();
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      let sql = "INSERT INTO follow_request (id_user_request,id_user_to_respond,timestamp) VALUES('userRequested','userToResponde','date')";
      sql = sql.replace('userRequested', idUserRequest);
      sql = sql.replace('userToResponde', idUserToRespond);
      sql = sql.replace('date', dateCreation);
      await connection.query(sql, (err, result) => {
        if (err) throw err;
        if (err) {
          res.json(err);
        } else {
          res.json({
            postInformation: 'request added',
          });
        }
      });
      connection.release();
    });
  },

  cancelfollowRequest: async (req, res, next) => {
    const { idUserRequest, idUserToRespond } = req.body;
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `DELETE FROM follow_request WHERE follow_request.id_user_request=${idUserRequest} AND follow_request.id_user_to_respond =${idUserToRespond};`;
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        next(res.json(result));
      });
      connection.release();
    });
  },

  userToUserFollowingState: async (req, res) => {
    const { idUserRequest, idUserToRespond } = req.body;
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `SELECT * FROM following f 
      WHERE f.id_user_bid_one IN(${idUserRequest},${idUserToRespond}) AND f.id_user_bid_two IN(${idUserToRespond},${idUserRequest});
      SELECT * FROM follow_request fr 
      WHERE fr.id_user_request = ${idUserRequest} AND fr.id_user_to_respond =${idUserToRespond};
      SELECT * FROM follow_request frs 
      WHERE frs.id_user_request =${idUserToRespond} AND frs.id_user_to_respond =${idUserRequest};`;
      await connection.query(sql, (err, results) => {
        if (err) throw err;
        /**
         *  0 : Not Friends
         *  1 : Friends
         *  2 : You sent Him Friend Request
         *  3 : He sent You Friend Request
         */

        if (results[0].length > 0) {
          if (results[0]) {
            return res.send('1');
          }
        } else if (results[1].length > 0) {
          if (results[1]) {
            return res.send('2');
          }
        } else if (results[2].length > 0) {
          if (results[2]) {
            return res.send('3');
          }
        } else {
          return res.send('0');
        }
      });
      connection.release();
    });
  },

  getAllmyFollowingRequestIgot: async (req, res) => {
    const { idUserToRespond } = req.body;
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `SELECT fr.*, u.firstName,u.lastName,u.image FROM follow_request fr, user u 
      WHERE u.id = fr.id_user_request AND fr.id_user_to_respond =${idUserToRespond};`;
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json(result);
      });
      connection.release();
    });
  },

  getAllmyFollowingRequestIsent: async (req, res) => {
    const { idUserRequest } = req.body;
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `SELECT fr.*, u.firstName,u.lastName,u.image FROM follow_request fr, user u 
      WHERE u.id = fr.id_user_to_respond AND fr.id_user_request =${idUserRequest};`;
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json(result);
      });
      connection.release();
    });
  },

  acceptfollowRequest: async (req, res, next) => {
    const { idUserRequest, idUserToRespond } = req.body;
    const dateCreation = new Date().getTime().toString();
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      let sql = "INSERT INTO following (id_user_bid_one,id_user_bid_two,timestamp) VALUES('userRequested','userToResponde','date')";
      sql = sql.replace('userRequested', idUserRequest);
      sql = sql.replace('userToResponde', idUserToRespond);
      sql = sql.replace('date', dateCreation);
      await connection.query(sql, (err, result) => {
        if (err) throw err;
        if (err) {
          res.json(err);
        } else {
          req.idUserRequest = idUserRequest;
          req.idUserToRespond = idUserToRespond;
          next();
        }
      });
      connection.release();
    });
  },

};
