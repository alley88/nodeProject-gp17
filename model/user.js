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


module.exports = {
    userFind,
    userSave
}