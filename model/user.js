const mongoose = require("../utils/database");

//定义表 和表的字段
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:String,
    password:String,
    registerDate:{ type: Number, default: Date.now },
    userPic:String,
    Nickname:String,
    userStatus:Boolean,
    userLevel:Number
})

const Users = mongoose.model("user",userSchema);


//查
const userFind = function(userInfo){
    return Users.findOne(userInfo)
}

//存

const userSave = function(userInfo){
    var user = new Users(userInfo);

    return user.save();
}


//list查
const userFindList = function(userInfo){
    return Users.find({},{username:1,registerDate:1,userPic:1,Nickname:1,userStatus:1}).skip((userInfo.page-1)*userInfo.pageSize).limit(userInfo.pageSize)
}

//查多少用户
const userListCount = (userInfo)=>{
    return Users.find(userInfo).count();
}


//修改用户登录状态

const userStatusUpdate = (id)=>{
    return  Users.update({_id:id},{$set:{userStatus:false}})
}

module.exports = {
    userFind,
    userSave,
    userFindList,
    userListCount,
    userStatusUpdate
}