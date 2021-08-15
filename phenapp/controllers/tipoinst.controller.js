const tipo = require('../models').TipoInstrumento
const Sequelize = require('../models')

exports.getAll = async function (req, res) {
  try {
    await tipo.findAll({ where: { enable: 'true' } })
      .then(tipo => {
        res.json(tipo)
      })
      .catch(err => res.status(419).send({ message: err.message }))
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.newTipo = async function (req, res) {
  try {
    console.log(req.body)
    await tipo.create({
      tipo: req.body.tipo
    }).then(tipo => {
      res.status(200).send({ message: 'Succesfully created' })
    }).catch(err => res.status(419).send({ message: err.message }))
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.updateTipo = async function (req, res, next) {
  try {
    console.log(req.body)
    await Sequelize.sequelize.transaction(async (t) => {
      const ins = await tipo.update({
        tipo: req.body.tipo
      }, {
        where: { id: parseInt(req.body.id) }
      }, { transaction: t })
      return ins
    })
    res.status(200).send({ message: 'Succesfully updated' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.disableTipo = async function (req, res, next) {
  try {
    console.log(req.body)
    await Sequelize.sequelize.transaction(async (t) => {
      const ins = await tipo.update({
        enable: false
      }, {
        where: { id: parseInt(req.body.id) }
      }, { transaction: t })
      return ins
    })
    res.status(200).send({ message: 'Succesfully disable' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
