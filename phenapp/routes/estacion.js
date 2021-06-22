const express = require('express')
const router = express.Router()
const { authJwt } = require('../middleware')
const estacion = require('../controllers/estacion.controller')

router.get(
  '/delete/:codigo',
  [authJwt.verifyToken, authJwt.isAdmin],
  estacion.disableEstacion)

router.get('/getAll',
  [authJwt.verifyToken, authJwt.isAdmin],
  estacion.getEstaciones)

router.post('/new',
  [authJwt.verifyToken, authJwt.isAdmin],
  estacion.createEstacion)

router.post('/updateEstacion',
  [authJwt.verifyToken, authJwt.isAdmin],
  estacion.updateEstacion)

module.exports = router
