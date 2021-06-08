const { Sequelize } = require('../models');


const variableEstacion = require('../models').VariableEstacion

exports.getVariableEstacion = async function(req, res, next) {
    await variableEstacion.findAll()
      .then(variableEstacion => {
        res.json(variableEstacion);
      })
      .catch(err => res.json(err));
  }

exports.createVariableEstacion = async function(req, res, next) {
  console.log("")
  let array = []
  let codigo = req.body.codigoEstacion;
  for (let a of req.body.variables) {
    let json = ({
      EstacionCodigo: codigo,
      VariableId: parseInt(a.id,10),
      HorarioId: parseInt(a.idHora,10),
      InstrumentoCodigo: "codigo1",
      enable: true
      })
      array.push(json)
    }

    await variableEstacion.bulkCreate(array)
    .then(variableEstacion => {
     console.log(variableEstacion);
    })
    .catch(err => console.log(err));
  }