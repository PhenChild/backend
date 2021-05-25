const user = require('../models').User

exports.getUser = async function(req, res, next) {
    await user.findAll()
      .then(user => {
        res.json(user);
      })
      .catch(err => res.json(err));
  }

exports.createUser = async function(req, res, next) {
  await estaciones.create({
    email: req.body.email,
    password: req.body.password,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono,
    correo: req.body.correo
    })
    .catch(err => res.json(err))
  }