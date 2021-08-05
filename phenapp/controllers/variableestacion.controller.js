const Sequelize = require('../models')

const variableEstacion = require('../models').VariableEstacion
const observer = require('../models').Observador
const estacion = require('../models').Estacion
const horario = require('../models').Horario
const variable = require('../models').Variable
const instrumento = require('../models').Instrumento

exports.getVarEstAll = async function (req, res, next) {
  await variableEstacion.findAll({ where: { enable: true } })
    .then(variableEstacion => {
      res.json(variableEstacion)
    })
    .catch(err => res.status(419).send({ message: err.message }))
}

exports.assignVariableEstacion = async function (req, res, next) {
  console.log(req.body)
  try {
    await Sequelize.sequelize.transaction(async (t) => {
      const array = []
      const codigo = req.body.codigoEstacion
      for (const a of req.body.variablesAgregadas) {
        const json = ({
          EstacionCodigo: codigo,
          VariableId: parseInt(a.id, 10),
          HorarioId: parseInt(a.idHora, 10),
          InstrumentoCodigo: a.InstrumentoCodigo
        })
        console.log(json)
        await variableEstacion.findOne({
          where: json
        }).then(v => {
          if (!v) {
            array.push(json)
          } else {
            v.enable = true
            v.save()
          }
        })
      }
      console.log(array)
      if (array.length !== 0) { await variableEstacion.bulkCreate(array, { transaction: t }) }

      for (const a of req.body.variablesEliminadas) {
        await variableEstacion.update({
          enable: false
        }, {
          where: { VariableId: a.id, EstacionCodigo: codigo }, returning: true, plain: true
        }, { transaction: t })
      }
    })
    res.status(200).send({ message: 'Succesfully assigned' })
  } catch (error) {
    res.status(419).send({ message: error.message })
  }
}

exports.getVariablesPorEstacion = async function (req, res, next) {
  console.log(req.params)

  await variableEstacion.findAll({
    where: {
      EstacionCodigo: req.params.codigo,
      enable: true
    },
    // variable id, nombre --- horario id,nombre
    include: [{
      model: variable,
      required: true,
      attributes: ['id', 'nombre']
    },
    {
      model: horario,
      required: false,
      attributes: ['id', 'tipoHora', 'hora']
    }]

  }).then(variableEstacion => {
    res.json(variableEstacion)
  })
    .catch(err => res.status(419).send({ message: err.message }))
}

exports.disableVariableEstacion = async function (req, res, next) {
  try {
    await Sequelize.sequelize.transaction(async (t) => {
      const v = await variableEstacion.update({
        enable: false
      }, {
        where: { id: req.params.varestid }, returning: true, plain: true
      }, { transaction: t })
      console.log(v[1].id)
      return v
    })
    res.status(200).send({ message: 'Succesfully deleted' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.getVariableObs = async function (req, res, next) {
  await observer.findOne({
    where: { UserId: req.userId },
    include: { model: estacion, required: true, attributes: ['codigo', 'nombreEstacion', 'posicion'] }
  }).then(obs => {
    const codigoEstacion = obs.EstacionCodigo
    variableEstacion.findAll({
      where: {
        EstacionCodigo: codigoEstacion,
        enable: true
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
      .catch(err => res.json(err))
  }).catch(err => res.status(500).send({
    message: err.message
  }))
}
