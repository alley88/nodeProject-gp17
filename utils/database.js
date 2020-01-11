const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/gp17";

mongoose.connect(url,(err)=>{
    if(err){
        console.log("连接失败")
    }else{
        console.log("连接成功")
    }
})


module.exports = mongoose;