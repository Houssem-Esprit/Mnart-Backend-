/* eslint-disable prettier/prettier */
const con = require('../config/dbConnection');
// const connection = require("../models/connection");

module.exports = {
  create: async (req, res) => {
    // const { idUser,idCategory,title,description,price } = req.body;
    const idUser = parseInt(req.body.idUser);
    const idCategory = parseInt(req.body.idCategory);
    const { title } = req.body;
    const { description } = req.body;
    const price = parseInt(req.body.price);
    console.log('Request Body entries :', idUser);
    // const{img}=req.file;
    const date = 'test';
    const idpost = new Date().getTime().toString();

    con.getConnection(async (err, connection) => {
      if (err) throw err;
      //
      /*

        */

      // eslint-disable-next-line quotes
      let sql = `INSERT INTO post(idpost,idUser,idCategory,title,description,price,img,date) VALUES('idPost','idUserr','idCategoryy','titlee','descriptionn','pricee','imgg','datee')`;
      sql = sql.replace('idPost', idpost);
      sql = sql.replace('idUserr', idUser);
      sql = sql.replace('idCategoryy', idCategory);
      sql = sql.replace('titlee', title);
      sql = sql.replace('descriptionn', description);
      sql = sql.replace('pricee', price);
      sql = sql.replace('imgg', req.file.filename);
      sql = sql.replace('datee', date);

      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json({
          postInformation: 'Comment added',
        });
      });
      connection.release();
    });
  },

  get4posts: async (req, res) => {
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = 'SELECT p.idpost,p.idUser,p.idCategory,p.title,p.description,p.price,p.img,p.date, COUNT(pl.idPost) likes FROM post as p INNER JOIN postlikes as pl ON pl.idPost = p.idpost GROUP BY pl.idPost ORDER BY likes DESC LIMIT 4';

      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json(result);
      });
      connection.release();
    });
  },

  getpostsByCategory: async (req, res) => {
    const idCat = req.body.idCategory;
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `SELECT p.idpost, u.id, p.idCategory, u.firstName, u.lastName,u.image, p.title, p.description, p.price, p.img, p.date FROM post as p INNER JOIN user as u on u.id = p.idUser WHERE p.idCategory=${idCat}`;

      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json(result);
      });
      connection.release();
    });
  },

  getpostsByUserID: async (req, res) => {
    const userID = req.body.idUser;
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `SELECT * FROM \`post\` WHERE post.idUser =${userID}`;
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json(result);
      });
      connection.release();
    });
  },

  DeletePostByID: async (req, res) => {
    const postID = req.params.idpost;
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `DELETE FROM \`post\` WHERE post.idpost =${postID}`;
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json(result);
      });
      connection.release();
    });
  },

  updatePost: async (req, res) => {
    const idPost = req.body.idpost;
    const idCategory = parseInt(req.body.idCategory);
    const { title } = req.body;
    const { description } = req.body;
    const price = parseInt(req.body.price);

    con.getConnection(async (err, connection) => {
      if (err) throw err;

      let sql = `UPDATE post set idCategory='idCategoryy', title='titlee', description='descriptionn', price='pricee', img='imgg' WHERE idpost=${idPost}`;
      sql = sql.replace('idCategoryy', idCategory);
      sql = sql.replace('titlee', title);
      sql = sql.replace('descriptionn', description);
      sql = sql.replace('pricee', price);
      sql = sql.replace('imgg', req.file.filename);
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json(result);
      });
      connection.release();
    });
  },

  getpostByID: async (req, res) => {
    const idPost = req.body.idpost;
    con.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `SELECT * FROM \`post\` WHERE post.idpost =${idPost} LIMIT 1`;
      await connection.query(sql, (err, result, fields) => {
        if (err) throw err;

        res.json(result[0]);
      });
      connection.release();
    });
  },
};
