const mongoose = require("../utils/database");

//定义表 和表的字段
const Schema = mongoose.Schema;
const booksSchema = new Schema({
    booksName:String,
    booksAuth:String,
    booksIntroduction:String,
    booksType:[String],
    booksStatus:String,
    booksUrl:String,
   
})

const Books = mongoose.model("books",booksSchema);



//添加书籍
const booksSave = (booksInfo)=>{
    var books = new Books(booksInfo);
    return books.save();
}

//分页

const booksList = (booksInfo)=>{
    return Books.find().skip((booksInfo.page-1)*booksInfo.pageSize).limit(booksInfo.pageSize)
}

//书籍的总数量
const booksListCount = ()=>{
    return Books.find().count()
}


//删除
const booksDelete = (_id)=>{
    return Books.remove({_id})
}



//更新数据
const booksUpdate = (_id,booksInfo)=>{
    return Books.update({_id},{$set:booksInfo});
}
module.exports = {
    booksSave,
    booksList,
    booksListCount,
    booksDelete,
    booksUpdate
}