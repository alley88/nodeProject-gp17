var express = require('express');
var router = express.Router();
var userController = require("../controller/user");

//验证码
router.get('/captch', userController.captch);

//注册
router.post("/register",userController.register)

//登录
router.post("/login",userController.login)

//用户列表
router.get("/userList",userController.userList);

//关闭用户登录状态
router.post("/toggleStatus",userController.toggleStatus)
module.exports = router;
