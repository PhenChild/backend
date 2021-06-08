const registros = require('../models').ObservacionVariable

exports.getRegistros = async function(req, res, next) {
    await registros.findAll()
      .then(registros => {
        res.json(registros);
      })
      .catch(err => res.json(err));
  }

exports.createRegistro = async function(req, res, next) {
  console.log(req.body);
  let point = {type: 'Point', coordinates: [parseFloat(req.body.latitud), parseFloat(req.body.longitud)]}
  await registros.create({
      valor: req.body.valor,
      isEditable: true,
      posicionObservacion: point,
      fechaObservacion: Date.parse(req.body.fecha),
      eventoClima: req.body.eventoClima,
      VariableEstacionId: parseInt(req.body.VariableEstacionId)
    })
    .catch(err => res.json(err))
  }