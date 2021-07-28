const registros = require('../models').ObservacionVariable
const VarsEstacion = require('../models').VariableEstacion
const Observer = require('../models').Observador
const User = require('../models').User
const Variable = require('../models').Variable

exports.getRegistrosEstacion = async function (req, res, next) {
  console.log(req.body)

  await registros.findAll({
    attributes: ['id', 'valor', 'fechaObservacion'],
    include: [{
      model: VarsEstacion,
      required: true,
      attributes: ['EstacionCodigo'],
      include: [{ model: Variable, required: true, attributes: ['nombre'] }]
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
}

exports.getRegistros = async function (req, res, next) {
  await registros.findAll()
    .then(registros => {
      res.json(registros)
    })
    .catch(err => res.json(err.message))
}

exports.createRegistro = async function (req, res, next) {
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
}
