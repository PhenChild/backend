const db = require('../models')
const ROLES = require('../constants/ENUM').ROLES
const User = db.User

checkDuplicateEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Email is already in use!'
      })
      return
    }
    next()
  })
}

checkRoleExisted = (req, res, next) => {
  if (req.body.role) {
    if (!ROLES.includes(req.body.role)) {
      res.status(400).send({
        message: 'Failed! Role does not exist = ' + req.body.role
      })
      return
    }
  }
  next()
}

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRoleExisted: checkRoleExisted
}

module.exports = verifySignUp
