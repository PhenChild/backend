var express = require('express');
var router = express.Router();

const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");
const test = require("../controllers/test.controller");




router.get('/getUsers', user.getAll);

// Logout
// router.post('/logout', function (req, res) {
//     console.log(req.body);
//     res.json('OK');
//   })

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
