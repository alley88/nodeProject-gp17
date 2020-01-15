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



const deleteCb = async (req,res)=>{
    var {_id} = req.query;

    var data = await booksModel.booksDelete(_id);
    if(data.ok == 1){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"删除成功",
                code:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"删除失败",
                code:2
            }
        })
    }
    


}



const update = async (req,res)=>{
    //const {booksName,booksAuth,booksIntroduction,booksType,booksStatus,booksUrl,_id} = req.body;
    const {_id,...rest} = req.body;
    const {booksType,...rests} = rest;

    var arr = booksType.split(",");
    let data = await booksModel.booksUpdate(_id,{booksType:arr,...rests});

    if(data.ok == 1){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"修改成功",
                code:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"服务器错误",
                code:2
            }
        })
    }

}



const search = async (req,res)=>{
    var {searchName,searchType,searchStatus,pageSize,page} = req.query;
    let data = await booksModel.booksSearch({searchName,searchType,searchStatus,pageSize:Number(pageSize),page:Number(page)});
    let count = await booksModel.booksListCount();
    res.json({
        code:200,
        errMsg:"",
        data:{
            data,
            code:1,
            count
        }
    })
}

const booksAll = async (req,res)=>{
    let data = await booksModel.booksAllList();
    res.json({
        code:200,
        errMsg:"",
        data:{
            info:"获取成功",
            data
        }
    })
}

module.exports = {
    add,
    list,
    deleteCb,
    update,
    search,
    booksAll
}