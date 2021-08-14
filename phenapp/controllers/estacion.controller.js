const Sequelize = require('../models')

const estacion = require('../models').Estacion
const observer = require('../models').Observador
const user = require('../models').User

exports.getEstaciones = async function (req, res, next) {
  await estacion.findAll({
    where: { enable: true }
  })
    .then(estaciones => {
      res.json(estaciones)
    })
    .catch(err => res.json(err))
}

exports.createEstacion = async function (req, res, next) {
  console.log(req.body)
  const point = { type: 'Point', coordinates: [parseFloat(req.body.latitud), parseFloat(req.body.longitud)] }
  await estacion.create({
    codigo: req.body.codigo,
    nombreEstacion: req.body.nombreEstacion,
    posicion: point,
    altitud: parseFloat(req.body.altitud),
    suelo: req.body.suelo,
    omm: req.body.omm
  }).then(variableEstacion => {
    res.status(200).send({ message: 'Succesfully created' })
  }).catch(err => res.status(419).send({ message: err.message }))
}

exports.disableEstacion = async function (req, res, next) {
  try {
    await Sequelize.sequelize.transaction(async (t) => {
      console.log(req.params)
      const e = await estacion.update({
        enable: false
      }, {
        where: { codigo: req.params.codigo }, returning: true, plain: true
      }, { transaction: t })
      console.log('algo ' + e[1].codigo)

      await observer.update({
        enable: false
      }, {
        where: { EstacionCodigo: e[1].codigo }
      }, { transaction: t }).then(obs => {
        console.log(obs)
        if (obs !== 0) {
          console.log('ingreso al for')
          for (const o of obs) {
            user.update({
              role: 'user'
            }, {
              where: { id: o.UserId }
            }, { transaction: t })
          }
        }
      })
      return e
    })
    res.status(200).send({ message: 'Succesfully deleted' })
  } catch (error) {
    res.status(419).send({ message: error.message })
  }
}

exports.updateEstacion = async function (req, res, next) {
  try {
    console.log(req.body)
    const point = { type: 'Point', coordinates: [parseFloat(req.body.latitud), parseFloat(req.body.longitud)] }
    await Sequelize.sequelize.transaction(async (t) => {
      const est = await estacion.update({
        nombreEstacion: req.body.nombreEstacion,
        posicion: point,
        altitud: parseFloat(req.body.altitud),
        suelo: req.body.suelo,
        omm: req.body.omm,
        JefeId: req.body.jefeid
      }, {
        where: { codigo: req.body.codigo }
      }, { transaction: t })
      return est
    })
    res.status(200).send({ message: 'Succesfully updated' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
