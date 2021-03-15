/* eslint-disable prettier/prettier */
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKEY = fs.readFileSync('./private.key', 'utf8');
const publicKEY = fs.readFileSync('./public.key', 'utf8');

const nonProtectedPaths = ['/users/create', '/users/authenticate'];

const verifyOptions = {
  issuer: 'http://mnart-backend_Server.com',
  subject: null,
  audience: null,
  expiresIn: '60d',
  algorithm: 'RS256', // RSASSA [ "RS256", "RS384", "RS512" ]
};

const verifyToken = (req, res, next) => {
  const result = {};
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (nonProtectedPaths.includes(req.path)) {
    return next();
  }
  if (token == null) {
    result.status = 401;
    result.error = 'unauthorized request';
    return res.status(result.status).send(result);
  }

  verifyOptions.subject = req.headers.subject;
  verifyOptions.audience = `http://mnart-backend_Server/${verifyOptions.subject.userEmail}/${verifyOptions.subject.userID}`;
  jwt.verify(token, publicKEY, verifyOptions, (err, user) => {
    if (err) {
      result.status = 403;
      result.error = 'authorized session has expired, wrong token';
      return res.status(result.status).send(result);
    }
    req.user = user;
    return next(); // pass the execution off to whatever request the client intended
  });
  return null;
};

const generateAcessToken = (payload) => {
  const signOptions = {
    issuer: 'http://mnart-backend_Server.com',
    subject: payload.userEmail,
    audience: `http://mnart-backend_Server/${payload.userEmail}/${payload.userID}`,
    expiresIn: '30d', // 30 days validity
    algorithm: 'RS256',
  };
  return jwt.sign(payload, privateKEY, signOptions);
};

module.exports = { generateAcessToken, verifyToken };
