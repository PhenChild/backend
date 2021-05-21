const estaciones = require('../models').Estacion

exports.getEstaciones = async function(req, res, next) {
    await estaciones.findAll()
      .then(estaciones => {
        res.json(estaciones);
      })
      .catch(err => res.json(err));
  }