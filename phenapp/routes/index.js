var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing.controller');
let estacion = require('../controllers/estacion.controller');
/* GET home page. */
router.post('/',landing.get_landing);
router.get('/estaciones', estacion.getEstaciones);
router.post('/',landing.submit_lead);

module.exports = router;
