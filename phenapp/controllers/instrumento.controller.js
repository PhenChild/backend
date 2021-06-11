const instrumento = require('../models').Instrumento

exports.getInstrumentos = async function(req, res, next) {
  await instrumento.findAll()
    .then(instrumento => {
      res.json(instrumento);
    })
    .catch(err => res.json(err));
}

exports.getInstrumentoPorEstacion = async function(req, res, next) {
  let estaciones = require('../models').Estacion;
  await instrumento.findAll({
    where: {
      EstacionCodigo: req.body.codigo
    },
    include: {
      model: estaciones,
      required: true
    }
  }).then(instrumentoPorEstacion => {
    res.json(instrumentoPorEstacion);
  })
  .catch(err => res.json(err));
}