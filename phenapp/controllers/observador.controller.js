const observer = require('../models').Observador
const estacion = require('../models').Estacion
const user = require('../models').User

exports.getAll = async function (req, res, next) {
  await observer.findAll({
    include: [{
      model: estacion, required: false
    }, {
      model: user, required: false
    }]
  })
    .then(observadores => {
      res.json(observadores);
    })
    .catch(err => res.json(err));
}

exports.getObserver = async function (req, res, next) {
  await observer.findOne({
    where: {
      UserId: req.params.userid
    },
    attributes: ['isJefe','id'],
    include: [{
      model: user, required: false, attributes: ['email','nombre','apellido','telefono']
    }]
  })
    .then(obs => {
      res.json(obs);
    })
    .catch(err => res.json(err));
}


exports.createObservador = async (req, res) => {
  await observer.create({
    isJefe: req.body.isjefe,
    EstacionCodigo: req.body.codigoestacion,
    UserId: req.body.userid
  }).then(obs => {
    res.send({ message: "Observer succesfully created!" });
  })
    .catch(err => res.json(err))
}

exports.getObservadoresPorEstacion = async (req, res) => {
  await observer.findAll({
    where : {
      EstacionCodigo: req.body.codigo
    },
    include: {
      model: Estacion,
      required: true
    }
  }).then(variableEstacion => {
    res.json(variableEstacion);
  })
  .catch(err => res.json(err));
}