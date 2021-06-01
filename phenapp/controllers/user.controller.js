const user = require('../models').User
const observer = require('../models').Observador
const estacion = require('../models').Estacion
// const jwt = require('jsonwebtoken');
// const jwtPass = "clave";

exports.getAll = async function(req, res, next) {
    await user.findAll()
      .then(user => {
        res.json(user);
      })
      .catch(err => res.json(err));
  }
