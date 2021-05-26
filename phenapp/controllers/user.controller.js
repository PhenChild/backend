const user = require('../models').User
const jwt = require('jsonwebtoken');
const jwtPass = "clave";

exports.getUser = async function(req, res, next) {
    await user.findAll()
      .then(user => {
        res.json(user);
      })
      .catch(err => res.json(err));
  }

exports.createUser = async function(req, res, next) {
  console.log(req.body);
  await user.create({
    email: req.body.email,
    password: req.body.password,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono

    })
    .catch(err => res.json(err))
  }

exports.loginUser = async function(req, res, err) {
  console.log(req.body);
  let e = req.body.email;
  let p = req.body.password;
  let userLogin = await user.findOne({
      where: {
        email: e,
        password: p,
        role: "admin"
      }
    })
  console.log(userLogin);
  if (userLogin == null) res.send("error")
  else {
    let token = jwt.sign({
      email: e,
      password: p
    },
    jwtPass,
    {expiresIn: '30'}
    )
    res.json(token);
  }
}