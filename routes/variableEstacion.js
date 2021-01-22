var express = require('express');
var router = express.Router();
const variablesPorEstacionController = require("../controllers/variableEstacion.controller.js");

router.get('/all', variablesPorEstacionController.showVariablePorEstacion) ;

router.post('/new', function(req, res, next){
    variablesPorEstacionController.createVariablePorEstacion(req.body);
    res.send('Añadida nueva estacion');
});

router.post('/update', function(req, res, next){
    res.send("something");
});

router.post('/delete', function(req, res, next){
    res.send("something");
});

module.exports = router;