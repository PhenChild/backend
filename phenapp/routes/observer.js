// Observadores
const { authJwt } = require('../middleware')

const express = require('express')
const router = express.Router()

const observador = require('../controllers/observador.controller')

router.get('/getAll',
  [authJwt.verifyToken, authJwt.isAdmin],
  observador.getAll)

router.get(
  '/get/:userid',
  [authJwt.verifyToken],
  observador.getObserver
)

router.post(
  '/new',
  [authJwt.verifyToken, authJwt.isAdmin],
  observador.createObservador)

router.get(
  '/getObsByEst/:codigo',
  [authJwt.verifyToken, authJwt.isAdmin],
  observador.getObservadoresPorEstacion)

router.get('/getEstacionPorObs',
  [authJwt.verifyToken, authJwt.isObserver],
  observador.getEstacionPorObs)

module.exports = router
