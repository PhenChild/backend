const horarios = require('../models').Horario
const Sequelize = require('../models')

exports.getHorarios = async function (req, res, next) {
  await horarios.findAll({
    where: { enable: true },
    attributes: { exclude: ['enable'] }
  })
    .then(horarios => {
      res.json(horarios)
    })
    .catch(err => res.json(err.message))
}

exports.newHorario = async function (req, res, next) {
  console.log(req.body)
  await horarios.create({
    tipoHora: req.body.tipoHora,
    hora: Date.parse(req.body.hora)
  }).then(horario => {
    res.status(200).send({ message: 'Succesfully created' })
  }).catch(err => res.status(419).send({ message: err.message }))
}

exports.updateHorario = async function (req, res, next) {
  try {
    console.log(req.body)
    await Sequelize.sequelize.transaction(async (t) => {
      const hor = await horarios.update({
        tipoHora: req.body.tipoHora,
        hora: Date.parse(req.body.hora),
        enable: (req.body.enable === 'true')
      }, {
        where: { id: parseInt(req.body.id, 10) }
      }, { transaction: t })
      return hor
    })
    res.status(200).send({ message: 'Succesfully updated' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
