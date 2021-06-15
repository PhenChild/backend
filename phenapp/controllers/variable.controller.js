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

  exports.updateVariable = async function(req, res, next) {
    console.log(req.body);
    let variable = await variables.findOne({
      where: {id: parseInt(req.body.id,10)   }
    })
    variable.nombre = req.body.nombre;
    variable.unidad =  req.body.unidad;
    variable.maximo = parseInt(req.body.max,10);
    variable.minimo = parseInt(req.body.min,10);
    variable.tipoDato = req.body.tipoDato;
    variable.save();
    res.json(200)
  }