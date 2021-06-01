var express = require('express');
var router = express.Router();
const { verifySignUp } = require("../middleware");
const auth = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");

router.post('/signup', [
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkRoleExisted,
    
  ],
  auth.signup);

router.post("/signin", auth.signin);

module.exports = router;