var express = require('express');
var router = express.Router();

const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");
const { verifySignUp } = require("../middleware");

router.get(
  '/getUsers',
  [authJwt.verifyToken, authJwt.isAdmin],
  user.getAll);

router.get(
  '/delete/:userid',
  [authJwt.verifyToken, authJwt.isAdmin],
  user.disableUser);

router.post('/updateRole',
  [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkRoleExisted],
  user.updateRole);

module.exports = router;
