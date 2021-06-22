const express = require('express')
const router = express.Router()

const { authJwt } = require('../middleware')
const user = require('../controllers/user.controller')
const estacion = require('../controllers/estacion.controller')
const variable = require('../controllers/variable.controller')
const variableEstacion = require('../controllers/variableestacion.controller')
const registro = require('../controllers/registro.controller')
const horario = require('../controllers/horario.controller')
const instrumento = require('../controllers/instrumento.controller')
const observador = require('../controllers/observador.controller')

module.exports = router
