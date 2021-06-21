var express = require('express');
var router = express.Router();

const { authJwt } = require("../middleware");
const varsEst = require("../controllers/variableestacion.controller");

// VariableEstacion
router.get('/getVariableEstacionAll',
    [authJwt.verifyToken, authJwt.isAdmin],
    varsEst.getVarEstAll);

router.post('/new',
    [authJwt.verifyToken, authJwt.isAdmin],
    varsEst.createVariableEstacion);

router.get('/getVariablesPorEstacion/:codigo',
    [authJwt.verifyToken, authJwt.isAdmin],
    varsEst.getVariablesPorEstacion);

router.get('/getVarsObs',
    [authJwt.verifyToken, authJwt.isObserver],
    varsEst.getVariableObs);

router.get(
    '/delete/:varestid',
    [authJwt.verifyToken, authJwt.isAdmin],
    varsEst.disableVariableEstacion);

module.exports = router;