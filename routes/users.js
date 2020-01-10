var express = require('express');
var router = express.Router();
var userController = require("../controller/user");

router.get('/captch', userController.captch);

module.exports = router;
