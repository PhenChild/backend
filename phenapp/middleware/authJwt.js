const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.User
const Observer = db.Observador

// eslint-disable-next-line no-undef
verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      })
    }
    req.userId = decoded.id
    next()
  })
}

// eslint-disable-next-line no-undef
isAdmin = (req, res, next) => {
  User.findOne({
    where: {
      id: req.userId,
      role: 'admin',
      enable: true
    }
  }).then(user => {
    if (user) {
      next()
      return
    }
    res.status(403).send({
      message: 'Require Admin Role!'
    })
  }).catch(err => { res.status(400).send({ message: err.message }) })
}

// eslint-disable-next-line no-undef
isAdminByEmail = (req, res, next) => {
  console.log(req.body)
  const e = req.body.email
  User.findOne({
    where: {
      email: e,
      role: 'admin',
      enable: true
    }
  }).then(user => {
    if (user) {
      req.userId = user.id
      next()
      return
    }
    res.status(403).send({
      message: 'Require Admin Role!'
    })
  }).catch(err => { res.status(400).send({ message: err.message }) })
}

// eslint-disable-next-line no-undef
isObserver = (req, res, next) => {
  Observer.findOne({
    where: {
      UserId: req.userId,
      enable: true
    }
  }).then(obs => {
    if (obs) {
      req.obsId = obs.id
      next()
      return
    }
    res.status(403).send({
      message: 'Require Observer Role!'
    })
  }).catch(err => { res.status(400).send({ message: err.message }) })
}

// eslint-disable-next-line no-undef
isObserverByEmail = (req, res, next) => {
  const e = req.body.email
  User.findOne({
    where: {
      email: e,
      role: 'observer',
      enable: true
    }
  }).then(user => {
    // console.log(user);
    if (user) {
      req.userId = user.id
      next()
      return
    }
    res.status(403).send({
      message: 'Require Observer Role!'
    })
  }).catch(err => { res.status(400).send({ message: err.message }) })
}

const authJwt = {
  // eslint-disable-next-line no-undef
  verifyToken: verifyToken,
  // eslint-disable-next-line no-undef
  isAdmin: isAdmin,
  // eslint-disable-next-line no-undef
  isAdminByEmail: isAdminByEmail,
  // eslint-disable-next-line no-undef
  isObserverByEmail: isObserverByEmail,
  // eslint-disable-next-line no-undef
  isObserver: isObserver
}
module.exports = authJwt

// isAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     if (user.role === "admin") {
//       next();
//       return;
//     }
//     res.status(403).send({
//       message: "Require Admin Role!"
//     });
//     return;
//   });
// };

// isObserver = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     if (user.role === "observer") {
//       next();
//       return;
//     }
//     res.status(403).send({
//       message: "Require Observer Role!"
//     });
//   });
// };
