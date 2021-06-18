// Observadores
const { authJwt } = require("../middleware");

var express = require('express');
var router = express.Router();

let observador = require('../controllers/observador.controller');

router.get('/getAll', observador.getAll);

router.get(
  "/get",
  [authJwt.verifyToken],
  observador.getObserver
);

router.post(
  '/new',
  [authJwt.verifyToken, authJwt.isAdmin],
  observador.createObservador);

module.exports = router;