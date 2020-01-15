const express = require("express");
const router = express.Router();
const articleController = require("../controller/article");
//添加章节
router.post("/addArticle",articleController.addArticle)

//获取章节
router.get("/articleList",articleController.articleList)

//章节内容
router.get("/details",articleController.details)
module.exports = router;