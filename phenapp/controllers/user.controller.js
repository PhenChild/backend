const Sequelize = require('../models');
const user = require('../models').User
const observer = require('../models').Observador
const estacion = require('../models').Estacion
// const jwt = require('jsonwebtoken');
// const jwtPass = "clave";

exports.getAll = async function (req, res, next) {
  await user.findAll({
    where: { enable: 'True' },
    attributes: { exclude: ['enable'] }
  })
    .then(user => {
      res.json(user);
    })
    .catch(err => res.json(err));
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
    res.status(200).send({ message: "Succesfully updated" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

exports.updateRole = async function (req, res, next) {
  console.log(req.body);
  let n = true;

  let reqRole = req.body.rol;
  await user.update({
    role: reqRole
  }, {
    where: {
      id: req.body.usuario
    }
  })

  if (reqRole == "observer") {
    let jefe = await observer.findOne({
      where: {
        isJefe: true,
        EstacionCodigo: req.body.estacion
      }
    })

    console.log('\n');
    console.log(jefe);

    let obs = await observer.findOne({
      where: {
        UserId: req.body.usuario
      }
    })
    console.log('\n');
    console.log(obs);

    let newJefeId = null;
    let newIsJefe = Boolean(req.body.esPrincipal);
    if (jefe != null) {
      if (newJefeId == obs.id) {
        newIsJefe = Boolean(req.body.esPrincipal);
        console.log('a');
      }
      else {
        res.status(502).send({ message: "Ya existe un observador principal" });
        n = false;
      }
    }

    console.log('\n');

    if (obs != null && n) {
      obs.isJefe = newIsJefe
      obs.EstacionCodigo = req.body.estacion
      obs.jefeId = newJefeId
      await obs.save()
      res.json("Actualizado con exito");
    }
    else if (n) {
      await observer.create({
        isJefe: newIsJefe,
        EstacionCodigo: req.body.estacion,
        jefeId: newJefeId,
        UserId: req.body.usuario
      })
      res.json("Creado con exito");
    }
  }
}