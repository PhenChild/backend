
const log = require('../models').Log

exports.getAll = async function (req, res, next) {
  try{
  await log.findAll({
    where: { enable: true }
  })
    .then(logs => {
      res.json(logs)
    })
    .catch(err => res.json(err))
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.newLog = async function (req, res, next) {
  try{
  console.log(req.body)
  await log.create({
    idRegistro: req.body.registro,
    nombreUser: req.body.user,
    valorPrevio: req.body.valorPrevio,
    valorNuevo: req.body.valorNuevo,
    fechaCambio: req.body.fecha,
    comentario: req.body.comentario
  }).then(log => {
    res.status(200).send({ message: 'Succesfully created' })
  }).catch(err => res.status(419).send({ message: err.message }))
} catch (error) {
  res.status(400).send({ message: error.message })
}
}
