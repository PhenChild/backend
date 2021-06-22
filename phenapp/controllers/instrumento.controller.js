const instrumento = require('../models').Instrumento

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
