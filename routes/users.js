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
router.post("/toggleStatus",userController.toggleStatus);

//搜索用户
router.get("/searchList",userController.searchList);

//搜索用户状态
router.get("/userstatus",userController.userstatusCb)

//所有用户
router.get("/search",userController.search)

//修改用户信息
router.post("/updateInfo",userController.updateInfo)
module.exports = router;
