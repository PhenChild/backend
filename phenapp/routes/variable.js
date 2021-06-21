var express = require('express');
var router = express.Router();

const { authJwt } = require("../middleware");
const variable = require("../controllers/variable.controller");

// Variables
router.get('/getVariables',
    [authJwt.verifyToken, authJwt.isAdmin],
    variable.getVariables);

router.post('/new',
    [authJwt.verifyToken, authJwt.isAdmin],
    variable.createVariable);

router.post('/updateVariable',
    [authJwt.verifyToken, authJwt.isAdmin],
    variable.updateVariable);

router.get(
    '/delete/:variableid',
    [authJwt.verifyToken, authJwt.isAdmin],
    variable.disableVariable);

module.exports = router;