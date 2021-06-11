var express = require('express');
var router = express.Router();
const { verifySignUp } = require("../middleware");
const auth = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");

router.post('/signup', [
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkRoleExisted,
    authJwt.isAdmin,
    authJwt.verifyToken, 
    
  ],
  auth.signup);

router.post("/signin", auth.signin);

router.post("/signinAdmin", [authJwt.isAdmin],
auth.signin);

router.post("/signinObs", [authJwt.isObserver],
auth.signin);

module.exports = router;