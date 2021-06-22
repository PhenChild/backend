const { authJwt } = require('../middleware')

const express = require('express')
const router = express.Router()

const instrumento = require('../controllers/instrumento.controller')

router.get('/getInstrumentos',
  [authJwt.verifyToken, authJwt.isAdmin],
  instrumento.getInstrumentos)

router.get('/getInstrumentoPorEstacion',
  [authJwt.verifyToken, authJwt.isAdmin],
  instrumento.getInstrumentoPorEstacion)

module.exports = router
