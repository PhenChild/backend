const { authJwt } = require('../middleware')

const express = require('express')
const router = express.Router()

const tipo = require('../controllers/tipoinst.controller')

router.get('/getAll',
  [authJwt.verifyToken, authJwt.isAdmin],
  tipo.getAll)

router.post('/newTipo',
  [authJwt.verifyToken, authJwt.isAdmin],
  tipo.newTipo)

router.post('/updateTipo', [authJwt.verifyToken, authJwt.isAdmin],
  tipo.updateTipo)

router.post('/disableTipo', [authJwt.verifyToken, authJwt.isAdmin],
  tipo.disableTipo)

module.exports = router
