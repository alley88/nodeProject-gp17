const articleModel = require("../model/article");

const addArticle = async (req,res)=>{
    console.log(123)
    let {title,content,booksInfo} = req.body;
    let data = await articleModel.articleSave({title,content,booksInfo});
    res.json({
        code:200,
        errMsg:"",
        data:{
            info:"添加成功",
            code:1
        }
    })

}



const articleList = async (req,res)=>{
    let {booksInfo} = req.query;
    let data = await articleModel.articleList({booksInfo});

    res.json({
        code:200,
        errMsg:"",
        data:{
            info:"获取成功",
            data
        }
    })
    
}



const details = async (req,res)=>{
    let {booksInfo} = req.query;
  
    let data = await articleModel.articleDetails(booksInfo);
    if(data){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:'获取成功',
                data,
                code:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:'获取失败',
                code:2
            }
        })
    }
    
}

module.exports = {
    addArticle,
    articleList,
    details
}