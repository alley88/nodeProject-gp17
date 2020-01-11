var express = require('express');
var router = express.Router();
var userController = require("../controller/user");

//验证码
router.get('/captch', userController.captch);

//注册
router.post("/register",userController.register)

//登录
router.post("/login",userController.login)


module.exports = router;
