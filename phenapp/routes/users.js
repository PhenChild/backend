var express = require('express');
var router = express.Router();

const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");
const test = require("../controllers/test.controller");




router.get(
  '/getUsers',
  [authJwt.verifyToken, authJwt.isAdmin],
  user.getAll);

router.delete(
  '/delete/:userid',
  [authJwt.verifyToken, authJwt.isAdmin],
  user.disableUser);

/**test for tokens */
router.get("/test/all", test.allAccess);

router.get(
  "/test/observer",
  [authJwt.verifyToken, authJwt.isObserver],
  test.observerTest
);

router.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  test.adminTest
);

module.exports = router;
