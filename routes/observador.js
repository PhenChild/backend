var express = require('express');
var router = express.Router();
const observadorController = require("../controllers/observador.controller.js");

router.get('/all', estacionesController.showObservador) ;

router.post('/new', function(req, res, next){
    observadorController.createObservador(req.body);
    res.send('Añadido Nuevo Observador');
});

router.post('/update', function(req, res, next){
    res.send("something");
});

router.post('/delete', function(req, res, next){
    res.send("something");
});

module.exports = router;