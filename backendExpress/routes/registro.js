var express = require('express');
var router = express.Router();

router.get('/all', function(req, res, next){
    res.send("something");
});

router.post('/new', function(req, res, next){
    res.send("something");
});

router.post('/update', function(req, res, next){
    res.send("something");
});

router.post('/delete', function(req, res, next){
    res.send("something");
});