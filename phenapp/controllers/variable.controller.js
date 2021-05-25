const variables = require('../models').Variable

exports.getVariable = async function(req, res, next) {
    await variables.findAll()
      .then(variables => {
        res.json(variables);
      })
      .catch(err => res.json(err));
  }

exports.createVariable = async function(req, res, next) {
  await variables.create({
    nombre: req.body.nombre,
    unidad: req.body.unidad,
    maximo: parseInt(req.body.max,10),
    minimo: parseInt(req.body.min,10),
    tipoDato: req.body.tipoDato
    })
    .catch(err => res.json(err))
  }