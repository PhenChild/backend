const { authJwt } = require('../middleware')

const express = require('express')
const router = express.Router()

const registro = require('../controllers/registro.controller')
router.post(
  '/new',
  [authJwt.verifyToken, authJwt.isObserver],
  registro.createRegistro)

router.get('/getRegistros',
  [authJwt.verifyToken, authJwt.isAdmin],
  registro.getRegistros)

module.exports = router
