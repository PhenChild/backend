const variableEstacion = require('../models').VariableEstacion

exports.getVariableEstacion = async function(req, res, next) {
    await variableEstacion.findAll()
      .then(variableEstacion => {
        res.json(variableEstacion);
      })
      .catch(err => res.json(err));
  }

exports.createVariableEstacion = async function(req, res, next) {
  await variableEstacion.create({
    estacionId: parseInt(req.body.idEstacion,10),
    variableId: parseInt(req.body.idVariable,10),
    horarioId: parseInt(req.body.idHorario,10),
    enable: parseInt(req.body.enabled,10)
    })
    .catch(err => res.json(err))
  }