var express = require('express');
var router = express.Router();
const registroController = require("../controllers/registro.controller.js");

router.get('/all', registroController.showRegistro) ;

router.post('/new', function(req, res, next){
    registroController.createRegistro(req.body);
    res.send('Añadida nueva estacion');
});

router.post('/update', function(req, res, next){
    res.send("something");
});

router.post('/delete', function(req, res, next){
    res.send("something");
});

module.exports = router;