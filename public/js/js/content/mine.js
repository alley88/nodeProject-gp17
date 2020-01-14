class Mine {
    constructor() {
        this.container = $(".list-content");
    }
    init() {
        this.createContent();
    }
    createContent() {
        this.container.html(Mine.template);
        if(window.sessionStorage.getItem("userinfo")){
            this.userInfo = JSON.parse(window.sessionStorage.getItem("userinfo"));
            $(".userInfo_update>img").attr("src",this.userInfo.userPic)
            $("#username").val(this.userInfo.Nickname)
        }

        this.updatUserPic();
        this.update();
    }
    //修改头像
    updatUserPic(){
        $("#userPic").on("change",this.handleUpdateUserPic.bind(this))
    }
    handleUpdateUserPic(){
        var file = $("#userPic")[0].files[0];
       
        var formData = new FormData();
        formData.append("booksUrl",file);

        $.ajax({
            type:"post",
            url:"/upload/image",
            data:formData,
            cache:false,
            processData:false,
            contentType:false,
            success:this.handleUpdatePicSucc.bind(this)
        })
    }
    handleUpdatePicSucc(data){
        if(data.data.code == 1){
            $(".userInfo_update>img").attr("src",data.data.url);
        }
    }
    update(){
       $("#userInfo").on("submit",this.handleUpdateCb.bind(this))
    }
    handleUpdateCb(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/users/updateInfo",
            data:{
                Nickname: $("#username").val(),
                userPic:$(".userInfo_update>img").attr("src"),
                id:this.userInfo._id
            },
            success:this.handleUpdateInfoSucc.bind(this)
        })
    }
    handleUpdateInfoSucc(data){
       if(data.data.code == 1){
            var obj = {};
            obj.Nickname = data.data.Nickname;
            obj.userPic = data.data.userPic;
            obj._id = data.data.id;

            window.sessionStorage.setItem("userinfo",JSON.stringify(obj))
       }
    }

}

Mine.template = `
    <div class="mine">
        <div class="content">
        <form id="userInfo">
            <div class="form-group">
            <label for="username">用户昵称</label>
            <input type="text" class="form-control" id="username" placeholder="请输入新的昵称">
            </div>
            <div class="form-group">
            <label for="exampleInputPassword1">修改头像</label>
            <div class="userInfo_update">
                <img src=""/>
                <input type="file" class="form-control" id="userPic" >
            </div>
            </div>
        <button type="submit" class="btn btn-primary update">修改</button>
      </form>
        </div>
    </div>
`