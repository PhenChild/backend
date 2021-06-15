const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;

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
    return;
  });
}

isObserver = (req, res, next) => {
  let e = req.body.email;
  let p = req.body.password;
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
  });
}


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
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