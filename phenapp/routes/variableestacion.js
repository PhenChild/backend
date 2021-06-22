const express = require('express')
const router = express.Router()

const { authJwt } = require('../middleware')
const varsEst = require('../controllers/variableestacion.controller')

// VariableEstacion
router.get('/getVariableEstacionAll',
  [authJwt.verifyToken, authJwt.isAdmin],
  varsEst.getVarEstAll)

router.post('/assign',
  [authJwt.verifyToken, authJwt.isAdmin],
  varsEst.assignVariableEstacion)

router.get('/getVariablesPorEstacion/:codigo',
  [authJwt.verifyToken, authJwt.isAdmin],
  varsEst.getVariablesPorEstacion)

router.get('/getVarsObs',
  [authJwt.verifyToken, authJwt.isObserver],
  varsEst.getVariableObs)

router.get(
  '/delete/:varestid',
  [authJwt.verifyToken, authJwt.isAdmin],
  varsEst.disableVariableEstacion)

module.exports = router
