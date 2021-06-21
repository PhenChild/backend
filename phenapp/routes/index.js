var express = require('express');
var router = express.Router();

const { authJwt } = require("../middleware");
let user = require('../controllers/user.controller');
let estacion = require('../controllers/estacion.controller');
let variable = require('../controllers/variable.controller');
let variableEstacion = require('../controllers/variableestacion.controller');
let registro = require('../controllers/registro.controller');
let horario = require('../controllers/horario.controller');
let instrumento = require('../controllers/instrumento.controller');
let observador = require('../controllers/observador.controller');

module.exports = router;