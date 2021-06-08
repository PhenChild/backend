const { Sequelize } = require('../models');

const estaciones = require('../models').Estacion

exports.getEstaciones = async function(req, res, next) {
    await estaciones.findAll()
      .then(estaciones => {
        res.json(estaciones);
      })
      .catch(err => res.json(err));
  }

exports.createEstacion = async function(req, res, next) {
  console.log(req.body);
  let point = {type: 'Point', coordinates: [parseFloat(req.body.latitud), parseFloat(req.body.longitud)]}
  await estaciones.create({
    codigo: req.body.codigoEstacion,
    nombreEstacion: req.body.nombreEstacion,
    posicion: point,
    altitud: parseFloat(req.body.altitud),
    suelo: req.body.suelo,
    omm: req.body.omm
    })
    .catch(err => res.json(err))
  }

exports.getVariablesPorEstacion = async function(req, res, next) {
  console.log(req.body);
  let variables = require('../models').Variable;
  let variableEstacion = require('../models').VariableEstacion;
  
  await variableEstacion.findAll({
    where : {
      EstacionCodigo: req.body.codigo
    },
    include: {
      model: variables,
      required: true
    }
  }).then(variableEstacion => {
    res.json(variableEstacion);
  })
  .catch(err => res.json(err));
}