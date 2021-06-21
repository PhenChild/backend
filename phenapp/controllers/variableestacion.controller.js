const { Sequelize } = require('../models');


const variableEstacion = require('../models').VariableEstacion

exports.getVarEstAll = async function (req, res, next) {
  await variableEstacion.findAll({ where: { enable: True } })
    .then(variableEstacion => {
      res.json(variableEstacion);
    })
    .catch(err => res.status(419).send({ message: err.message }))
}

exports.createVariableEstacion = async function (req, res, next) {
  let array = []
  let codigo = req.body.codigoEstacion;
  for (let a of req.body.variables) {
    let json = ({
      EstacionCodigo: codigo,
      VariableId: parseInt(a.id, 10),
      HorarioId: parseInt(a.idHora, 10),
      InstrumentoCodigo: "codigo1",
      enable: true
    })
    array.push(json)
  }

  await variableEstacion.bulkCreate(array)
    .then(variableEstacion => {
      res.status(200).send({ message: "Succesfully updated" });
      console.log(variableEstacion);
    })
    .catch(err => res.status(419).send({ message: err.message }))
}

exports.getVariablesPorEstacion = async function (req, res, next) {
  console.log(req.params);
  let variables = require('../models').Variable;
  let variableEstacion = require('../models').VariableEstacion;

  await variableEstacion.findAll({
    where: {
      EstacionCodigo: req.params.codigo,
      enable: True
    },
    //variable id, nombre --- horario id,nombre
    attributes: [],
    include: [{
      model: variables,
      required: true,
      attributes: ['id', 'nombre']
    },
    {
      model: horarios,
      required: false,
      attributes: ['id', 'tipoHorario', 'hora']
    }]

  }).then(variableEstacion => {
    res.json(variableEstacion);
  })
    .catch(err => res.status(419).send({ message: err.message }));
}

exports.disableVariableEstacion = async function (req, res, next) {
  try {
    await Sequelize.sequelize.transaction(async (t) => {
      const v = await variableEstacion.update({
        enable: false,
      }, {
        where: { id: req.params.varestid }, returning: true, plain:true
      }, { transaction: t })
      console.log(v[1].id);
      return v;
    });
    res.status(200).send({ message: "Succesfully deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

exports.getVariableObs = async function (req, res, next) {
  await observer.findOne({
    where: { UserId: req.userId },
    include: { model: estacion, required: true, attributes: ['codigo', 'nombreEstacion', 'posicion'] }
  }).then(obs => {
    var codigoEstacion = obs.EstacionCodigo;
    variablesEst.findAll({
      where: {
        EstacionCodigo: codigoEstacion,
        enable: True
      },
      attributes: ['id'],
      include: [{
        model: estacion, required: true, attributes: ['codigo']
      }, {
        model: horario, required: true, attributes: ['tipoHora', 'hora']
      }, {
        model: variable, required: true, attributes: ['nombre', 'unidad', 'maximo', 'minimo', 'tipoDato']
      }, {
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