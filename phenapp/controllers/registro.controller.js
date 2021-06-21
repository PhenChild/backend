const registros = require('../models').ObservacionVariable
const VarsEstacion = require('../models').VariableEstacion
const Observer = require('../models').Observador

exports.getRegistros = async function (req, res, next) {
  await registros.findAll()
    .then(registros => {
      res.json(registros);
    })
    .catch(err => res.json(err.message));
}


exports.createRegistro = async function (req, res, next) {
  let variable = VarsEstacion.findByPk(req.body.VariableEstacionId);
  let observador = Observer.findByPk(req.obsId);

  if (variable != null && variable.EstacionCodigo === observador.EstacionCodigo) {
    console.log(req.body);
    console.log(req.obsId);
    let point = { type: 'Point', coordinates: [parseFloat(req.body.latitud), parseFloat(req.body.longitud)] }
    await registros.create({
      valor: req.body.valor,
      posicionObservacion: point,
      fechaObservacion: Date.parse(req.body.fecha),
      VariableEstacionId: parseInt(req.body.VariableEstacionId),
      ObservadorId: parseInt(req.obsId)
    }).then(registro => { 
      if (registro){
        res.status(200).send("succesfully inserted registry");
      }})
      .catch(err => res.json(err.message))
  } else {
    res.status(400).send({ message: "Forbidden station or null variable" });
  }
}