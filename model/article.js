const mongoose = require("../utils/database");
const Schema = mongoose.Schema;

//定义字段

const articleSchema = new Schema({
    title:String,
    content:String,
    booksInfo:{
        type:Schema.Types.ObjectId,
        ref:"books"
    }
})




const Article = mongoose.model("articles",articleSchema)


//存

const articleSave = (articleInfo)=>{
    var article = new Article(articleInfo);
    return article.save()
}

//查

const articleList = (articleInfo)=>{
    return Article.find({booksInfo:articleInfo.booksInfo}).populate("booksInfo")
}

//详情
const articleDetails = (id)=>{
    return Article.findOne({_id:id},{title:1,content:1,_id:0})
}

module.exports = {
    articleSave,
    articleList,
    articleDetails
}
