var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing.controller');
let estacion = require('../controllers/estacion.controller');
let observador = require('../controllers/observador.controller');
let variable = require('../controllers/variable.controller');
let variableEstacion = require('../controllers/variableEstacion.controller');

// Estaciones
router.post('/',landing.get_landing);
router.get('/getEstaciones', estacion.getEstaciones);
router.post('/newEstacion', estacion.createEstacion);
router.post('/',landing.submit_lead);

// Observadores
router.get('/getObservadores', observador.getObservador);
router.post('/newObservador', observador.createObservador);

// Variables
router.get('/getVariables', variable.getVariable);
router.post('/newVariables', variable.createVariable);
module.exports = router;

// VariableEstacion
router.get('/getVariableEstacion', variableEstacion.getVariableEstacion);
router.post('/newVariableEstacion', variableEstacion.createVariableEstacion);