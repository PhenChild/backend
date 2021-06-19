const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;
const Observer = db.Observador;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};


isAdmin = (req, res, next) => {
  User.findOne({
    where: {
      id: req.userId,
      role: "admin"
    }
  }).then(user => {
    if (user) {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Admin Role!"
    });
  }).catch(err=>{res.status(400).send({message: err.message})});
}

isAdminByEmail = (req, res, next) => {
  console.log(req.body);
  let e = req.body.email;
  User.findOne({
    where: {
      email: e,
      role: "admin"
    }
  }).then(user => {
    if (user) {
      req.userId = user.id;
      next();
      return;
    }
    res.status(403).send({
      message: "Require Admin Role!"
    });
  }).catch(err=>{res.status(400).send({message: err.message})});
}

isObserver = (req, res, next) => {
  Observer.findOne({
    where: {
      UserId: req.userId,
    }
  }).then(obs => {
    // console.log(user);
    if (obs) {
      req.obsId = obs.id;
      next();
      return;
    }
    res.status(403).send({
      message: "Require Observer Role!"
    });
  }).catch(err=>{res.status(400).send({message: err.message})});
}

isObserverByEmail = (req, res, next) => {
  let e = req.body.email;
  User.findOne({
    where: {
      email: e,
      role: "observer"
    }
  }).then(user => {
    // console.log(user);
    if (user) {
      req.userId = user.id;
      next();
      return;
    }
    res.status(403).send({
      message: "Require Observer Role!"
    });
  }).catch(err=>{res.status(400).send({message: err.message})});
}


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAdminByEmail: isAdminByEmail,
  isObserverByEmail: isObserverByEmail,
  isObserver: isObserver
};
module.exports = authJwt;

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