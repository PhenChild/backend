const observer = require('../models').Observador
const estacion = require('../models').Estacion
const user = require('../models').User
const Sequelize = require('../models')
const bcrypt = require('bcryptjs')

exports.getAll = async function (req, res, next) {
  await observer.findAll({
    where: { enable: true },
    include: [{
      model: estacion, required: false
    }, {
      model: user, required: false, where: { enable: 'true' }
    }]
  })
    .then(observadores => {
      res.json(observadores)
    })
    .catch(err => res.json(err))
}

exports.getObserver = async function (req, res, next) {
  await observer.findOne({
    where: {
      UserId: req.userId,
      enable: true
    },
    attributes: ['id'],
    include: [{
      model: user, required: false, attributes: ['email', 'nombre', 'apellido', 'telefono']
    }]
  })
    .then(obs => {
      if (!obs) {
        return res.status(400).send({ message: "there isn't an active observer for this user" })
      }
      res.json(obs)
    })
    .catch(err => res.status(400).send({ message: err.message }))
}

exports.updateObserver = async function (req, res, next) {
  try {
    await Sequelize.sequelize.transaction(async (t) => {
      const usr = await user.update(req.body, {
        where: { id: req.userId }
      }, { transaction: t })
      return usr
    })
    res.status(200).send({ message: 'Succesfully updated' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.updatePass = async function (req, res, next) {
  try {
    console.log(req.body)
    await Sequelize.sequelize.transaction(async (t) => {
      const usr = await user.findOne({
        where: { id: req.userId }
      }, { transaction: t }).then(usr => {
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          usr.password
        )
        if (!passwordIsValid) {
          return res.status(401).send({
            message: 'Invalid Old Password!'
          })
        }
        user.update({
          password: bcrypt.hashSync(req.body.newpassword, 8),
        }, {
          where: { id: req.userId }
        }, { transaction: t })
      })
      return usr
    })
    res.status(200).send({ message: 'Succesfully updated' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.createObservador = async (req, res) => {
  await observer.create({
    EstacionCodigo: req.body.codigoestacion,
    UserId: req.body.userid
  }).then(obs => {
    res.send({ message: 'Observer succesfully created!' })
  })
    .catch(err => res.status(400).send({ message: err.message }))
}

exports.getObservadoresPorEstacion = async (req, res) => {
  await observer.findAll({
    where: {
      EstacionCodigo: req.params.codigo,
      enable: true
    },
    attributes: ['id'],
    include: [{ model: user, required: true, attributes: ['nombre', 'apellido', 'email'] }]
  }).then(obs => {
    res.json(obs)
  })
    .catch(err => res.json(err.message))
}

exports.getEstacionPorObs = async function (req, res, next) {
  await observer.findOne({
    where: { UserId: req.userId },
    attributes: ['id'],
    include: {
      model: estacion, required: true, attributes: ['codigo', 'nombreEstacion', 'posicion']
    }
  }).then(obs => {
    res.json(obs)
  }).catch(err => res.status(500).send({
    message: err
  }))
}
