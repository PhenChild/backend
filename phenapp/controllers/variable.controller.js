const variables = require('../models').Variable
const varsEst = require('../models').VariableEstacion

exports.getVariable = async function (req, res, next) {
  await variables.findAll({
    where: { enable: True }
  })
    .then(variables => {
      res.json(variables);
    })
    .catch(err => res.status(419).send({ message: err.message }));
}

exports.disableVariable = async function (req, res, next) {
  try {
    await Sequelize.sequelize.transaction(async (t) => {
      const v = await variables.update({
        enable: false,
      }, {
        where: { id: req.params.variableid }, returning: true, plain:true
      }, { transaction: t })
      console.log(v[1].id);
      await varsEst.update({
        enable: false,
      }, {
        where: { VariableId: u[1].id },returning: true, plain:true
      }, { transaction: t })
      return v;
    });
    res.status(200).send({ message: "Succesfully deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

exports.createVariable = async function (req, res, next) {
  await variables.create({
    nombre: req.body.nombre,
    unidad: req.body.unidad,
    maximo: parseInt(req.body.max, 10),
    minimo: parseInt(req.body.min, 10),
    tipoDato: req.body.tipoDato
  }).then(vars => {
    res.status(200).send({ message: "Succesfully created" });
  }).catch(err => res.status(419).send({ message: err.message }))
}

exports.updateVariable = async function (req, res, next) {
  console.log(req.body);
  await variables.findOne({
    where: { id: parseInt(req.body.id, 10) }
  }).then(variable => {
    if (!variable) {
      return res.status(400).send({ message: "Variable isn't defined" });
    }
    variable.nombre = req.body.nombre;
    variable.unidad = req.body.unidad;
    variable.maximo = parseInt(req.body.max, 10);
    variable.minimo = parseInt(req.body.min, 10);
    variable.tipoDato = req.body.tipoDato;
    variable.save()
      .then(v => { res.status(200).send({ message: "Succesfully updated" }) })
      .catch(err => res.json(err));;
  }).catch(err => res.status(419).send({ message: err.message }))
}

