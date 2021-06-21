const { authJwt } = require("../middleware");

var express = require('express');
var router = express.Router();

let instrumento = require('../controllers/instrumento.controller');

router.get('/getInstrumentos', 
[authJwt.verifyToken, authJwt.isAdmin],
instrumento.getInstrumentos);

router.get('/getInstrumentoPorEstacion', 
[authJwt.verifyToken, authJwt.isAdmin],
instrumento.getInstrumentoPorEstacion);

module.exports = router;