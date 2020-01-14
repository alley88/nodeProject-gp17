class UsersAction {
    constructor() {
        this.container = $(".list-content");
        this.userListData = {
            pageSize: 5,
            page: 1
        }
    }
    init() {
        this.createContent();
    }
    createContent() {
        this.container.html(UsersAction.template);
        this.getUserList();
        this.userSearch();
        this.userStatusSearch();
        this.userSearchBtn();
    }
    getUserList() {
        $.ajax({
            type: "get",
            url: "/users/userList",
            data: this.userListData,
            success: this.handleGetUserListSucc.bind(this)
        })
    }
    handleGetUserListSucc(data) {
       
        var dataList = data.data.data;
        var str = "";
        for (var i = 0; i < dataList.length; i++) {
            str += `
            <tr>
            <td>${dataList[i].username}</td>
            <td>${dataList[i].Nickname}</td>
            <td><img src="${dataList[i].userPic}"/></td>
            <td>${  moment(dataList[i].registerDate).format("YYYY-MM-DD hh:mm:ss")}</td>
            <td>${dataList[i].userStatus?'开启':'关闭'}</td>
            <td data-id="${dataList[i]._id}">
                <button type="button" class="btn btn-link btn-off">关闭</button>
                <button type="button" class="btn btn-link btn-on">开启</button>
            </td>
        </tr>
            `
        }

        $(".usersAction tbody").html(str);
        this.userOff();
    }
    userOff(){
        $(".btn-off").each(this.handleUserOffEach.bind(this))
    }
    handleUserOffEach(index){
        
        $(".btn-off").eq(index).on("click",this.handleBtnOffCb.bind(this,index))
    }
    handleBtnOffCb(index){
        
      var id = $(".btn-off").eq(index).parent().attr("data-id");
      var actionId = JSON.parse(window.sessionStorage.getItem("userinfo"))._id
       $.ajax({
           type:"post",
           url:"/users/toggleStatus",
           data:{
               userId:id,
               actionId
           },
           success:this.handleBtnOffSucc.bind(this)
       })
    }
    handleBtnOffSucc(data){
       if(data.data.code == 1){
           this.getUserList()
       }else{
           window.location.href="http://10.60.15.150:3000/error.html"
       }
    }
    userSearch(){
        $("#user_search").on("keydown",this.handleFormDown.bind(this))
       
    }
    handleFormDown(e){
       if(e.keyCode == 13){
          
           var val = $("#user_search").val();
           $.ajax({
               type:"get",
               url:"/users/searchList",
               data:{
                nickname:val
               },
               success:this.handleUserSearchSucc.bind(this)
           })
           
       }
    }
    handleUserSearchSucc(data){
        this.handleGetUserListSucc(data);
    }
    userStatusSearch(){
        $("#users_Status").on("change",this.handleUserStatusChange.bind(this))
    }
    handleUserStatusChange(){
        console.log(123)
        $.ajax({
            type:"get",
            url:"/users/userstatus",
            data:{
                userStatus: $("#users_Status").val()
            },
            success:this.handleUserStatusSucc.bind(this)
        })
    }
    handleUserStatusSucc(data){
        this.handleGetUserListSucc(data);
    }
    userSearchBtn(){
        $("#user_search-btn").on("click",this.handleSearchBtn.bind(this))
    }
    handleSearchBtn(){
        var nickname = $("#user_search").val();
        var userStatus = $("#users_Status").val();

        $.ajax({
            type:"get",
            url:"/users/search",
            data:{
                nickname,
                userStatus
            },
            success:this.handleBtnSucc.bind(this)
        })
    }
    handleBtnSucc(data){
        this.handleGetUserListSucc(data);
    }
}
UsersAction.template = `
    <div class="usersAction">
    <div class="form-search form-inline">
    <div class="form-group">
        <label for="user_search">用户昵称</label>
        <input type="text" class="form-control" id="user_search" placeholder="请输入要搜索的用户昵称">
    </div>
    <div class="form-group">
        <label for="users_Status">用户状态</label>
        <select class="form-control" id="users_Status">
            <option value="">全部</option>
            <option value="1">开启</option>
            <option value="2">关闭</option>
        </select>
    </div>
    <button type="button" class="btn btn-primary" id="user_search-btn">搜索</button>
</div>
<table class="table table-striped">
   <thead>
        <tr>
            <th>用户账号</th>
            <th>用户昵称</th>
            <th>用户头像</th>
            <th>注册时间</th>
            <th>登录状态</th>
            <th>操作</th>
        </tr>
   </thead>
   <tbody>
        <tr>
            <td>alley90088</td>
            <td>辰东</td>
            <td><img src="../../../img/1578736782091-u=3508817781,1654561115&fm=58&s=6D83639716736DB3087070600300E070.jpg"/></td>
            <td>2019:11:11</td>
            <td>开启</td>
            <td>
                <button type="button" class="btn btn-link btn-off">关闭</button>
                <button type="button" class="btn btn-link btn-on">开启</button>
            </td>
        </tr>
   </tbody>
</table>
<div id="pageList"></div>
    </div>
`