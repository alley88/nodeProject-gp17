const booksModel = require("../model/books");
const add = async (req,res,next)=>{
    
    var {booksName,booksAuth,booksIntroduction,booksType,booksStatus,booksUrl} = req.body;

    if(!booksUrl){
        booksUrl = "http://10.60.15.150:3000/img/default.jpg"
    }
    var arr = booksType.split(",");
    let data = await booksModel.booksSave({booksName,booksAuth,booksIntroduction,booksType:arr,booksStatus,booksUrl:booksUrl})
    res.json({
        code:200,
        errMsg:"",
        data:{
            info:"添加成功",
            code:1
        }
    })

}


const list = async (req,res)=>{
    let {pageSize,page} = req.query;
    let data = await booksModel.booksList({pageSize:Number(pageSize),page:Number(page)});
    let count = await booksModel.booksListCount();

   res.json({
       code:200,
       errMsg:"",
       data:{
           info:"获取成功",
           data,
           count
       }
   })
}

module.exports = {
    add,
    list
}