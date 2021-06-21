const horarios = require('../models').Horario

exports.getHorario = async function(req, res, next) {
    await horarios.findAll({
      where: {enable: True}
    })
      .then(horarios => {
        res.json(horarios);
      })
      .catch(err => res.json(err));
  }