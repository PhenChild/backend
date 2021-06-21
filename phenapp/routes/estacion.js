var express = require('express');
var router = express.Router();
const { authJwt } = require("../middleware");
const estacion = require("../controllers/estacion.controller");

router.get(
    '/delete/:codigo',
    [authJwt.verifyToken, authJwt.isAdmin],
    estacion.disableEstacion);

router.get('/getEstaciones',
    [authJwt.verifyToken, authJwt.isAdmin],
    estacion.getEstaciones);

router.post('/newEstacion',
    [authJwt.verifyToken, authJwt.isAdmin],
    estacion.createEstacion);

router.post('/updateEstacion',
    [authJwt.verifyToken, authJwt.isAdmin],
    estacion.updateEstacion);

module.exports = router;