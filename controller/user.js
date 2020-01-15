//引入验证码依赖包
var svgCaptcha = require('svg-captcha');
var userModel = require("../model/user")
var crypto = require('crypto');






var store = {}
const captch = (req, res) => {
    const captcha = svgCaptcha.create({
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 3, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#cc9966', // 验证码图片背景颜色
    })

    //在服务端保存生成的验证码
    store.captch = captcha.text.toLowerCase();

    //captcha  是一个对象   {data:svg地址,text:验证码}；
    res.send(captcha)
}


const register = async (req, res, next) => {
    var { username, password, captch } = req.body;

    if ( store.captch === captch.toLowerCase()) {
        let data = await userModel.userFind({ username })
        if (data) {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "用户名重复",
                    code: 2
                }
            })
        } else {
            //创建加密方式
            var hash = crypto.createHash("sha256");
            //需要加密的数据
            hash.update(password)


            var obj = {};
            obj.username = username;
            //获取加密的数据
            obj.password = hash.digest('hex');
            obj.registerDate = new Date().getTime();
            obj.userPic = "http://10.60.15.150:3000/img/timg.jpg";
            obj.Nickname = Math.random().toString(16).substring(2, 8);
            obj.userStatus = true;
            obj.userLevel = 0;


            let userSaveData = await userModel.userSave(obj);

            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "注册成功",
                    code: 1
                }
            })

        }


    } else {
        res.json({
            code: 200,
            errmsg: "",
            data: {
                info: "验证码错误",
                code: -1
            }
        })
    }


}




const login = async (req, res) => {
    var { username, password, captch } = req.body;

    if ( store.captch === captch.toLowerCase()) {

        let data = await userModel.userFind({ username });
        if (data.userStatus) {
            //创建加密方式
            var hash = crypto.createHash("sha256");
            //需要加密的数据
            hash.update(password)

            if (data.password === hash.digest('hex')) {

                req.session["userId"] = username;


                res.json({
                    code: 200,
                    errmsg: "",
                    data: {
                        info: "登录成功",
                        _id: data._id,
                        userPic: data.userPic,
                        Nickname: data.Nickname,
                        code: 1
                    }
                })



            } else {
                res.json({
                    code: 200,
                    errmsg: "",
                    data: {
                        info: "密码错误",
                        code: 3
                    }
                })
            }


        } else {
            res.json({
                code: 200,
                errmsg: "",
                data: {
                    info: "您有不良行为，请联系管理",
                    code: 2
                }
            })
        }

    } else {
        res.json({
            code: 200,
            errmsg: "",
            data: {
                info: "验证码错误",
                code: -1
            }
        })
    }
}



const userList = async (req, res) => {
    let { pageSize, page } = req.query;
    let data = await userModel.userFindList({ pageSize: Number(pageSize), page: Number(page) });
    let count = await userModel.userListCount();

    res.json({
        code: 200,
        errMsg: "",
        data: {
            code: 1,
            data,
            count
        }
    })

}



const toggleStatus = async (req, res) => {
    let { userId, actionId } = req.body;
    let data = await userModel.userFind({ _id: actionId });
    console.log(data);
    if (data.userLevel == 1001) {
        let userData = await userModel.userStatusUpdate(userId);
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "OK",
                code: 1
            }
        })


    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "您没有权限访问该功能，请联系相关人员授权",
                code: 2
            }
        })
    }
}


const searchList = async (req,res)=>{
    var {nickname} = req.query;
    let data = await userModel.userSearchnickname({nickname});
    res.json({
        code:200,
        errmsg:"",
        data:{
            info:"查询成功",
            code:1,
            data
        }
    })
    
}


const userstatusCb = async (req,res)=>{
    var {userStatus} = req.query;
    var bStop = true;

   
    if(userStatus==2){
        
        bStop = false;
    }

    let data = await userModel.userSearchStatus({userStatus:bStop});
    res.json({
        code:200,
        errmsg:"",
        data:{
            info:"查询成功",
            code:1,
            data
        }
    })


}


const search = async (req,res)=>{
    var {nickname,userStatus} = req.query;
    if(nickname && userStatus){
        var bStop = true;
        if(userStatus==2){
            bStop = false;
        }

        let data = await userModel.userSearch({nickname,userStatus:bStop});

        res.json({
            code:200,
            errmsg:"",
            data:{
                info:"查询成功",
                code:1,
                data
            }
        })
    }
    

}


const updateInfo = async (req,res)=>{
    var {Nickname,userPic,id} = req.body;

    let data = await userModel.userUpdate(id,{Nickname,userPic});
    
    if(data.ok == 1){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"修改成功",
                code:1,
                Nickname,
                userPic,
                id
            }
        })
    }


}
module.exports = {
    captch,
    register,
    login,
    userList,
    toggleStatus,
    searchList,
    userstatusCb,
    search,
    updateInfo
}