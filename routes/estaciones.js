var express = require('express');
var router = express.Router();
const estacionesController = require("../controllers/estaciones.controller.js");

router.get('/all', estacionesController.showEstaciones) ;

router.post('/new', function(req, res, next){
    estacionesController.createEstacion(req.body);
    res.send('Añadida nueva estacion');
});

router.post('/update', function(req, res, next){
    res.send("something");
});

router.post('/delete', function(req, res, next){
    res.send("something");
});

module.exports = router;