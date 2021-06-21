const instrumento = require('../models').Instrumento

exports.getInstrumentos = async function(req, res, next) {
  await instrumento.findAll({where: {enable : "True"}})
    .then(instrumento => {
      res.json(instrumento);
    })
    .catch(err => res.status(419).send({message: err.message}));
}

exports.getInstrumentoPorEstacion = async function(req, res, next) {
  let estaciones = require('../models').Estacion;
  await instrumento.findAll({
    where: {
      EstacionCodigo: req.body.codigo,
      enable: True
    },
    include: {
      model: estaciones,
      required: true
    }
  }).then(instrumentoPorEstacion => {
    res.json(instrumentoPorEstacion);
  })
  .catch(err => res.status(419).send({message: err.message}));
}