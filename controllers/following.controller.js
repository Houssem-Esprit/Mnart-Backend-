/* eslint-disable prettier/prettier */
const con = require('../config/dbConnection');

module.exports = {

  deleteFollowing: async (req, res) => {
    const { idUserBidOne, idUserBidTwo } = req.body;
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `DELETE FROM following WHERE following.id_user_bid_one IN (${idUserBidOne},${idUserBidTwo}) AND following.id_user_bid_two IN (${idUserBidOne},${idUserBidTwo});`;
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json(result);
      });
      connection.release();
    });
  },

};
