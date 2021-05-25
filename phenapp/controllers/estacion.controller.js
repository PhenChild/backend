const estaciones = require('../models').Estacion

exports.getEstaciones = async function(req, res, next) {
    await estaciones.findAll()
      .then(estaciones => {
        res.json(estaciones);
      })
      .catch(err => res.json(err));
  }

exports.createEstacion = async function(req, res, next) {
  await estaciones.create({
    codigoEstacion: req.body.codigo,
    nombreEstacion: req.body.nombre,
    latitud: parseFloat(req.body.latitud),
    longitud: parseFloat(req.body.longitud),
    suelo: req.body.suelo,
    omm: req.body.omm
    })
    .catch(err => res.json(err))
  }