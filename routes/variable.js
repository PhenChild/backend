var express = require('express');
var router = express.Router();
const variableController = require("../controllers/variable.controller.js");

router.get('/all', variableController.showVariable) ;

router.post('/new', function(req, res, next){
    variableController.createVariable(req.body);
    res.send('Añadido Nueva Variable');
});

router.post('/update', function(req, res, next){
    res.send("something");
});

router.post('/delete', function(req, res, next){
    res.send("something");
});

module.exports = router;