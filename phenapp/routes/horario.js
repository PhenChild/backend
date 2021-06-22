const { authJwt } = require('../middleware')

const express = require('express')
const router = express.Router()

const horario = require('../controllers/horario.controller')

router.get('/getHorarios', [authJwt.verifyToken, authJwt.isAdmin],
  horario.getHorarios)

module.exports = router
