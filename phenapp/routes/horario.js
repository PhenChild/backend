const { authJwt } = require("../middleware");

var express = require('express');
var router = express.Router();

let horario = require('../controllers/horario.controller');

// Horarios
router.get('/getHorarios', [authJwt.verifyToken, authJwt.isAdmin],
    horario.getHorario);

module.exports = router;