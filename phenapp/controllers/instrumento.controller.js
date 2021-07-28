const instrumento = require('../models').Instrumento
const Sequelize = require('../models')

exports.getInstrumentos = async function (req, res) {
  await instrumento.findAll({ where: { enable: 'true' } })
    .then(instrumento => {
      res.json(instrumento)
    })
    .catch(err => res.status(419).send({ message: err.message }))
}

exports.getInstrumentoPorEstacion = async function (req, res, next) {
  const estaciones = require('../models').Estacion
  await instrumento.findAll({
    where: {
      EstacionCodigo: req.body.codigo,
      enable: true
    },
    include: {
      model: estaciones,
      required: true
    }
  }).then(instrumentoPorEstacion => {
    res.json(instrumentoPorEstacion)
  })
    .catch(err => res.status(419).send({ message: err.message }))
}

exports.newInstrumento = async function (req, res) {
  console.log(req.body)
  await instrumento.create({
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    EstacionCodigo: req.body.EstacionCodigo
  }).then(instrumento => {
    res.status(200).send({ message: 'Succesfully created' })
  }).catch(err => res.status(419).send({ message: err.message }))
}

exports.updateInstrumento = async function (req, res, next) {
  try {
    console.log(req.body)
    await Sequelize.sequelize.transaction(async (t) => {
      const ins = await instrumento.update({
        nombre: req.body.nombre,
        EstacionCodigo: req.body.EstacionCodigo
      }, {
        where: { codigo: req.body.codigo }
      }, { transaction: t })
      return ins
    })
    res.status(200).send({ message: 'Succesfully updated' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.disableInstrumento = async function (req, res, next) {
  try {
    console.log(req.body)
    await Sequelize.sequelize.transaction(async (t) => {
      const ins = await instrumento.update({
        enable: false
      }, {
        where: { codigo: req.body.codigo }
      }, { transaction: t })
      return ins
    })
    res.status(200).send({ message: 'Succesfully disable' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
