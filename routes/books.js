const express = require("express");
const router = express.Router();
const booksController = require("../controller/books");

//添加书籍
router.post("/add",booksController.add);

//书籍列表
router.get("/list",booksController.list)
module.exports = router;