const horarios = require('../models').Horario
const Sequelize = require('../models')

exports.getHorarios = async function (req, res, next) {
  try {
    await horarios.findAll({
      where: { enable: true },
      attributes: { exclude: ['enable'] }
    })
      .then(horarios => {
        res.json(horarios)
      })
      .catch(err => res.json(err.message))
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.newHorario = async function (req, res, next) {
  try{
  console.log(req.body)
  await horarios.create({
    tipoHora: req.body.tipoHora,
    hora: req.body.hora
  }).then(horario => {
    res.status(200).send({ message: 'Succesfully created' })
  }).catch(err => res.status(419).send({ message: err.message }))
} catch (error) {
  res.status(400).send({ message: error.message })
}
}

exports.updateHorario = async function (req, res, next) {
  try {
    console.log(req.body)
    await Sequelize.sequelize.transaction(async (t) => {
      const hor = await horarios.update({
        tipoHora: req.body.tipoHora,
        hora: req.body.hora,
        enable: 'true'
      }, {
        where: { id: parseInt(req.body.id, 10) }
      }, { transaction: t })
      return hor
    }).catch(err => res.status(419).send({ message: err.message }))
    res.status(200).send({ message: 'Succesfully updated' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.disableHorario = async function (req, res, next) {
  try {
    console.log(req.body)
    await Sequelize.sequelize.transaction(async (t) => {
      const hor = await horarios.update({
        enable: false
      }, {
        where: { id: parseInt(req.body.id, 10) }
      }, { transaction: t })
      return hor
    })
    res.status(200).send({ message: 'Succesfully disable' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
