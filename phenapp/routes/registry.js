const { authJwt } = require("../middleware");

var express = require('express');
var router = express.Router();

let registro = require('../controllers/registro.controller');
router.post(
  '/new',
  [authJwt.verifyToken, authJwt.isObserver],
  registro.createRegistro);

router.get('/getRegistros',
  [authJwt.verifyToken, authJwt.isAdmin],
  registro.getRegistros);

module.exports = router;