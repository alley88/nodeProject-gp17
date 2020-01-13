class Login {
    constructor(container) {
        this.container = container;
    }
    init() {
        this.createContent();
    }
    createContent() {
        this.container.html(Login.template);
        this.toggleContent();
        this.createCaptch();
        this.userLogin();
    }
    toggleContent() {
        $("#user_login .text-success").on("click", this.handleToggleContentCb.bind(this))
    }
    handleToggleContentCb() {
        new Page().createContent(true)
    }
    createCaptch() {
        $.ajax({
            type: "get",
            url: "/users/captch",
            success: this.handleCreateCaptchSucc.bind(this)
        })
    }
    handleCreateCaptchSucc(data) {
        $(".captch>svg").remove();
        $(".captch").append(data.data);
        this.randomCaptch();
    }
    randomCaptch() {
        $(".captch>svg").on("click", this.handlerandomCaptchCb.bind(this))
    }
    handlerandomCaptchCb() {
        this.createCaptch();
    }
    userLogin(){
        $("#user_login").on("submit",this.handleUserLoginCb.bind(this))
    }
    handleUserLoginCb(e){
        e.preventDefault();
        var username = $("#user_login_username").val();
        var password = $("#user_login_password").val();
        var captch = $("#user_login_captch").val();

        $.ajax({
            type:"post",
            url:"/users/login",
            data:{
                username,
                password,
                captch
            },
            success:this.handleLoginSucc.bind(this)
        })
        
    }
    handleLoginSucc(data){
        if(data.data.code === 1){
            var obj = {};
            obj.userPic = data.data.userPic;
            obj._id = data.data._id;
            obj.Nickname = data.data.Nickname;
            window.sessionStorage.setItem("userinfo",JSON.stringify(obj));
            window.location.href="http://10.60.15.150:3000/html/list.html";
           
        }else{
            alert(data.data.info);
            window.location.reload();
        }
    }
}

Login.template = `
<div id="container">
            <div class="logo">
                <img src="https://cas.1000phone.net/cas/images/login/logo.png">
            </div>
            <form id="user_login">
                <div class="form-group">
                    <label for="user_login_username">用户名</label>
                    <input type="text" class="form-control" id="user_login_username" placeholder="请输入用户名">
                </div>
                <div class="form-group">
                    <label for="user_login_password">密码</label>
                    <input type="password" class="form-control" id="user_login_password" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="user_login_password">验证码</label>
                    <div class="captch">
                        <input type="text" class="form-control" id="user_login_captch" placeholder="验证码">
                    </div>
                </div>
                <p class="text-success">没有账号?立即注册</p>
                <button type="submit" class="btn btn-primary user_btn">登录</button>
            </form>
        </div>
`