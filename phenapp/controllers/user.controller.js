const Sequelize = require('../models');
const user = require('../models').User
const observer = require('../models').Observador
const estacion = require('../models').Estacion

exports.getAll = async function (req, res, next) {
  await user.findAll({
    where: { enable: True },
    attributes: { exclude: ['enable'] }
  })
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(419).send({ message: err.message}));
}

exports.disableUser = async function (req, res, next) {
  try {
    await Sequelize.sequelize.transaction(async (t) => {
      const u = await user.update({
        enable: false,
      }, {
        where: { id: req.params.userid }, returning: true, plain:true
      }, { transaction: t })
      console.log(u[1].id);
      const obs = await observer.update({
        enable: false,
      }, {
        where: { UserId: u[1].id },returning: true, plain:true
      }, { transaction: t })

      if (obs) {
        await estacion.update({
          JefeId: null,
        }, {
          where: { JefeId: obs[1].id }
        }, { transaction: t })
      }
      return u;
    });
    res.status(200).send({ message: "Succesfully deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

exports.updateRole = async function (req, res, next) {
  try {
    await Sequelize.sequelize.transaction(async (t) => {
      const u = await user.update({
        role: req.body.role
      }, {
        where: {
          id: req.body.usuario
        }
      }, { transaction: t })

      if(req.body.role == 'observer'){
        await observer.create({
          EstacionCodigo: req.body.estacion,
          UserId: u[1].id
        }, { transaction: t })
      }
    return u;
    });
    res.status(200).send({ message: "Succesfully updated" });
  } catch (error) {
    res.status(419).send({ message: error.message });
  }
}