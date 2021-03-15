/* eslint-disable prettier/prettier */
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { generateAcessToken } = require('../utils/jwt_utils');

const saltRounds = 10;

// const { json } = require('sequelize/types');

module.exports = {
  create: async (req, res, next) => {
    const result = {};
    let status = 201;
    if (!req.body) {
      status = 404;
      result.status = status;
      result.error = 'Bad informations, Please retry!';
      return res.status(status).send(result);
    }

    const {
      firstName, lastName, email,
      password, image,
    } = req.body;

    console.log('Email: ', email);
    await User.findOne({ where: { email } })
      .then(async (searchedUser) => {
        if (searchedUser) {
          const err = `user with email: ${searchedUser.email} is already exists`;
          status = 403;
          result.status = status;
          result.error = err;
          return res.status(status).json(result);
        }
        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
          if (err) {
            result.status = 500;
            result.error = 'failed to crypt password';
            res.status(result.status).send(result);
            next();
          } else {
            const user = {
              firstName,
              lastName,
              email,
              password: hashedPassword,
              image,
            };

            await User.create(user)
              .then((createdUser) => {
                result.status = 200;
                result.result = createdUser;
                return res.status(result.status).json(result);
              })
              .catch((errCreateUser) => {
                status = 500;
                result.status = status;
                result.error = errCreateUser.message;
                return res.status(status).send(result);
              });
          }
        });
      })
      .catch((err) => {
        status = 500;
        result.status = status;
        result.error = err.stack;
        return res.status(status).send(result);
      });
  },

  getUsers: async (req, res) => {
    await User.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || '500: Some error occured while fetching users.',
        });
      });
  },

  getUser: async (req, res) => {
    const { email, password } = req.body;
    const result = {};
    await User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          console.log('user : ', user);
          bcrypt.compare(password, user.password)
            .then((match) => {
              if (match) {
                const payload = {
                  userID: user.id,
                  userFirstname: user.firstName,
                  userLastName: user.lastName,
                  userEmail: user.email,
                };

                result.status = 200;
                result.token = generateAcessToken(payload);
                result.result = user;
                console.log('response user', res.status(result.status).json(result));
                return res.status(result.status).json(result);
              }
              if (!match) {
                result.status = 404;
                result.error = `wrong password for user: ${email}`;
                return res.status(result.status).json(result);
              }
            });
        } else {
          result.status = 404;
          result.error = `user with credential: ${email} does not exist`;
          return res.status(result.status).json(result);
        }
      })
      .catch(
        (err) => {
          res.status(500).json('message', err.message);
        },
      );
  },

  getUserByID: async (req, res) => {
    const { id } = req.body;
    const result = {};
    await User.findOne({ where: { id } })
      .then((user) => {
        if (user) {
          result.status = 200;
          result.result = user;
          return res.status(result.status).json(result);
        }
      })
      .catch(
        (err) => {
          res.status(500).json('message', err.message);
        },
      );
  },
};
