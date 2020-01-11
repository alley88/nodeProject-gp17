const express = require("express");
const router = express.Router();
const uploadController = require("../controller/upload")

//上传图片
router.post("/image", uploadController.upload)


module.exports = router;