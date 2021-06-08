var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing.controller');
let estacion = require('../controllers/estacion.controller');
let variable = require('../controllers/variable.controller');
let variableEstacion = require('../controllers/variableEstacion.controller');
let registro = require('../controllers/registro.controller');
let horario = require('../controllers/horario.controller');
let instrumento = require('../controllers/instrumento.controller');


// Estaciones
router.post('/',landing.get_landing);
router.get('/getEstaciones', estacion.getEstaciones);
router.post('/newEstacion', estacion.createEstacion);
router.post('/',landing.submit_lead);
router.get('/getVariablesPorEstacion', estacion.getVariablesPorEstacion);

// Variables
router.get('/getVariables', variable.getVariable);
router.post('/newVariables', variable.createVariable);

// VariableEstacion
router.get('/getVariableEstacion', variableEstacion.getVariableEstacion);
router.post('/newVariableEstacion', variableEstacion.createVariableEstacion);

// Registros
router.get('/getRegistros', registro.getRegistros);
router.post('/newRegistro', registro.createRegistro);

// Horarios
router.get('/getHorarios', horario.getHorario);

// Instrumentos
router.get('/getInstrumentos', instrumento.getInstrumentos);
router.get('/getInstrumentoPorEstacion', instrumento.getInstrumentoPorEstacion);

module.exports = router;