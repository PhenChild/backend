const registros = require('../models').ObservacionVariable
const VarsEstacion = require('../models').VariableEstacion
const Horario = require('../models').Horario
const Observer = require('../models').Observador
const User = require('../models').User
const Variable = require('../models').Variable
const Op = require('sequelize').Op
const Sequelize = require('../models')

exports.getRegistrosEstacion = async function (req, res, next) {
  try{
  console.log(req.body)

  await registros.findAll({
    attributes: ['id', 'valor', 'fechaObservacion'],
    include: [{
      model: VarsEstacion,
      required: true,
      attributes: ['EstacionCodigo'],
      include: [{ model: Variable, required: true, attributes: ['nombre'] },
      { model: Horario, required: true, attributes: ['tipoHora','hora'] }]
    },
    {
      model: Observer,
      required: true,
      attributes: ['UserId'],
      include: [{ model: User, required: true, attributes: ['nombre', 'apellido'] }]
    }]

  }).then(variableEstacion => {
    res.json(variableEstacion)
  })
    .catch(err => res.status(419).send({ message: err.message }))
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.getRegistros = async function (req, res, next) {
  try{
  await registros.findAll()
    .then(registros => {
      res.json(registros)
    })
    .catch(err => res.json(err.message))
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.createRegistro = async function (req, res, next) {
  try{
  const variable = VarsEstacion.findByPk(req.body.VariableEstacionId)
  const observador = Observer.findByPk(req.obsId)

  if (variable != null && variable.EstacionCodigo === observador.EstacionCodigo) {
    console.log(req.body)
    console.log(req.obsId)
    const point = { type: 'Point', coordinates: [parseFloat(req.body.latitud), parseFloat(req.body.longitud)] }
    await registros.create({
      valor: req.body.valor,
      posicionObservacion: point,
      fechaObservacion: Date.parse(req.body.fecha),
      VariableEstacionId: parseInt(req.body.VariableEstacionId),
      ObservadorId: parseInt(req.obsId)
    }).then(registro => {
      if (registro) {
        res.status(200).send('succesfully inserted registry')
      }
    })
      .catch(err => res.json(err.message))
  } else {
    res.status(400).send({ message: 'Forbidden station or null variable' })
  }
} catch (error) {
  res.status(400).send({ message: error.message })
}
}

exports.estacionVariableHoraFilter = async function (req, res, next) {
  try{
  console.log(req.body)

  await registros.findAll({
    attributes: ['id', 'valor', 'fechaObservacion'],
    where: { fechaObservacion: { [Op.between]: [req.body.fechaInicio, req.body.fechaFin] } },
    include: [{
      model: VarsEstacion,
      required: true,
      attributes: ['EstacionCodigo'],
      where: { EstacionCodigo: req.body.codigoEstacion },
      include: [{ model: Variable, required: true, where: { id: parseInt(req.body.idVariable) }, attributes: ['nombre'] }]
    }]
  }).then(variableEstacion => {
    res.json(variableEstacion)
  })
    .catch(err => res.status(419).send({ message: err.message }))
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.updateRegistry = async function (req, res, next) {
  try {
    console.log(req.body)
    await Sequelize.sequelize.transaction(async (t) => {
      const reg = await registros.update({
        valor: req.body.valor
      }, {
        where: { id: parseInt(req.body.id) }
      }, { transaction: t })
      return reg
    })
    res.status(200).send({ message: 'Succesfully updated' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
