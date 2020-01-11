//1、引入
const multer = require("multer");

//2、设置文件的存储位置以及文件的名称
var storage = multer.diskStorage({
    //将文件存储到指定的位置
    destination: function (req, file, cb) {
        cb(null, './public/img')
    },
    //更改上传后文件的名称
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)

    }
})

//3、应用上面的配置项
var upload = multer({ storage: storage })

//4、设置当前字段最多能上传多少个文件
var cpUpload = upload.fields([{ name: 'booksUrl', maxCount: 1 }])


module.exports = cpUpload;