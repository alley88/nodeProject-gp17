const cpUpload = require("../utils/upload");

const upload = (req, res, next) => {
    cpUpload(req, res, (err) => {
        if (err) {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "服务器错误",
                    code: 0,
                    err: err
                }
            })
        } else {
            var urlpath = "http://10.60.15.150:3000/img/" + req.files.booksUrl[0].filename;
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    url: urlpath,
                    code: 1
                }
            })
        }


    })
}


module.exports = {
    upload
}