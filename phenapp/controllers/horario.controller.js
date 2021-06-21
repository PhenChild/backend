const horarios = require('../models').Horario

exports.getHorarios = async function(req, res, next) {
    await horarios.findAll({
      where: {enable: true}
    })
      .then(horarios => {
        res.json(horarios);
      })
      .catch(err => res.json(err.message));
  }