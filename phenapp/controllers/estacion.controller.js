const { Sequelize } = require('../models');

const estacion = require('../models').Estacion
const observer = require('../models').Observador
const variablesEst = require('../models').VariableEstacion
const horario = require('../models').Horario
const variable = require('../models').Variable
const instrumento = require('../models').Instrumento

exports.getEstaciones = async function (req, res, next) {
  await estacion.findAll()
    .then(estaciones => {
      res.json(estaciones);
    })
    .catch(err => res.json(err));
}

exports.createEstacion = async function (req, res, next) {
  console.log(req.body);
  let point = { type: 'Point', coordinates: [parseFloat(req.body.latitud), parseFloat(req.body.longitud)] }
  await estacion.create({
    codigo: req.body.codigoEstacion,
    nombreEstacion: req.body.nombreEstacion,
    posicion: point,
    altitud: parseFloat(req.body.altitud),
    suelo: req.body.suelo,
    omm: req.body.omm
  })
    .catch(err => res.json(err))
}

exports.getVariablesPorEstacion = async function (req, res, next) {
  console.log(req.body);
  let variables = require('../models').Variable;
  let variableEstacion = require('../models').VariableEstacion;

  await variableEstacion.findAll({
    where: {
      EstacionCodigo: req.params.codigo
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

exports.updateEstacion = async function (req, res, next) {
  console.log(req.body);
  let point = { type: 'Point', coordinates: [parseFloat(req.body.latitud), parseFloat(req.body.longitud)] }
  await estacion.update({
    nombreEstacion: req.body.nombreEstacion,
    posicion: point,
    altitud: parseFloat(req.body.altitud),
    suelo: req.body.suelo,
    omm: req.body.omm
  }, {
    where: { codigo: req.body.codigo }
  })
}

exports.getVariableObs = async function (req, res, next) {
  await observer.findOne({
    where: { UserId: req.userId },
    include: {model: estacion, required: true, attributes: ['codigo','nombreEstacion','posicion']}
  }).then(obs => {
    var codigoEstacion = obs.EstacionCodigo;
    variablesEst.findAll({
      where: {
        EstacionCodigo: codigoEstacion
      },
      attributes: ['id'],
    include: [{
      model: estacion, required: true, attributes: ['codigo']
    },{
      model: horario, required: true, attributes: ['tipoHora','hora']
    },{
      model: variable, required: true, attributes: ['nombre','unidad','maximo','minimo','tipoDato']
    },{
      model: instrumento, required: false, attributes: ['nombre']
    }] 
    })
      .then(info => {
        res.json(info)
      })
      .catch(err => res.json(err));
  }).catch(err => res.status(500).send({
    message: err
  }))
}

exports.getEstacionesObs = async function (req, res, next) {
  await observer.findOne({
    where: { UserId: req.userId},
    attributes: ['id'],
    include: {
      model: estacion, required: true, attributes: ['codigo','nombreEstacion','posicion']
    }
  }).then(obs => {
    res.json(obs);
  }).catch(err => res.status(500).send({
    message: err
  }))
}