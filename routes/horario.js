var express = require('express');
var router = express.Router();
const horarioController = require("../controllers/horario.controller.js");

router.get('/all', horarioController.showHorario) ;

router.post('/new', function(req, res, next){
    horarioController.createHorario(req.body);
    res.send('Añadida nueva estacion');
});

router.post('/update', function(req, res, next){
    res.send("something");
});

router.post('/delete', function(req, res, next){
    res.send("something");
});

module.exports = router;