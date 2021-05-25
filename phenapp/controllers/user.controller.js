const user = require('../models').User

exports.getUser = async function(req, res, next) {
    await user.findAll()
      .then(user => {
        res.json(user);
      })
      .catch(err => res.json(err));
  }

exports.createUser = async function(req, res, next) {
  console.log(req.body);
  await user.create({
    email: req.body.email,
    password: req.body.password,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono

    })
    .catch(err => res.json(err))
  }