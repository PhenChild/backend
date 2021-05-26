const observadores = require('../models').Observador

exports.getObservador = async function(req, res, next) {
    await observadores.findAll()
      .then(observadores => {
        res.json(observadores);
      })
      .catch(err => res.json(err));
  }

exports.createObservador = async function(req, res, next) {
  /*await estaciones.create({
    password: req.body.password,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono,
    correo: req.body.correo
    })
    .catch(err => res.json(err))*/
  }