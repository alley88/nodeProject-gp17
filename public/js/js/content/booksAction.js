class BooksAction {
    constructor() {
        this.container = $(".list-content");
        this.booksListData = {
            pageSize: 5,
            page: 1
        }
        this.flag = true;
        this.activeBooksInfo = {};
    }
    init() {
        this.createContent();
    }
    createContent() {
        this.container.html(BooksAction.template);
        this.getBooksList(this.booksListData);
        this.upload();
        this.booksSearch();
    }
    getBooksList({ pageSize, page }) {
        //  limit 10  page 1
      //  this.flag = true;
        $.ajax({
            type: "get",
            url: "/books/list",
            data: {
                pageSize,
                page
            },
            success: this.handleGetBooksListSucc.bind(this)
        })
    }
    handleGetBooksListSucc(data) {
        if (data.data.data.length > 0) {
            var str = "";
            var type = "";
            this.dataList = data.data.data;


            for (var i = 0; i < this.dataList.length; i++) {
                for (var j = 0; j < this.dataList[i].booksType.length; j++) {
                    type += `
                        <span>${this.dataList[i].booksType[j]}</span>
                    `
                }


                str += `
                <tr>
                <td>${  this.dataList[i].booksName}</td>
                <td>${  this.dataList[i].booksAuth}</td>
                <td><img src="${  this.dataList[i].booksUrl}"></td>
                <td>
                    ${type}
                </td>
                <td>
                ${  this.dataList[i].booksStatus}
                </td>
                <td data-id="${  this.dataList[i]._id}">
                    <button type="button" class="btn btn-link btn-actions" data-toggle="modal" data-target="#booksModal">操作</button>
                    <button type="button" class="btn btn-link btn-delete">删除</button>
                </td>
            </tr>`

                var type = "";

            }
            $(".booksActions tbody").html(str);

            //删除操作
            this.booksdelete();
            //修改操作
            this.booksUpdate();

            if (this.flag) {
                this.createPageList(data.data.count)
            }

            this.flag = false;

        }
    }
    createPageList(count) {
        var _that = this;
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            laypage.render({
                elem: 'pageList',
                count,
                limit: 5,
                groups: 5,
                jump: _that.handleCreatePageListCb.bind(_that)
            });
        });
    }
    handleCreatePageListCb(obj, first) {
        if (!first) {
            this.getBooksList({ pageSize: obj.limit, page: obj.curr })
        }
    }
    booksdelete() {
        $(".btn-delete").each(this.handleBtnDeleteEach.bind(this))
    }
    handleBtnDeleteEach(index) {
        $(".btn-delete").eq(index).on("click", this.handleBtnDeleteCb.bind(this, index))
    }
    handleBtnDeleteCb(index) {
        this.id = $(".btn-delete").eq(index).parent().attr("data-id");
        this.booksName = $(".btn-delete").eq(index).parent().parent().children().eq(0).text();


        layui.use("layer", this.handleLayUICb.bind(this))

    }
    handleLayUICb() {
        var layer = layui.layer;
        layer.open({
            type: 0,
            title: "删除书籍",
            content: `您确定要删除《${this.booksName}》书籍吗？`, //这里content是一个普通的String
            btn: ['确认', '取消'],
            yes: this.handleLayOk.bind(this),
            btn2: function (index, layero) { },
            cancel: function () { }
        });
    }
    handleLayOk(index, layero) {
        $.ajax({
            type: "get",
            url: "/books/delete",
            data: {
                _id: this.id
            },
            success: this.handlebooksDeleteSucc.bind(this, index)
        })
    }
    handlebooksDeleteSucc(index, data) {
        if (data.data.code == 1) {
            this.getBooksList(this.booksListData)
            layer.close(index);
        } else {
            alert(data.data.info)
        }

    }
    //修改操作
    booksUpdate() {
        $(".btn-actions").each(this.handleBtnActionsEach.bind(this))
    }
    handleBtnActionsEach(index) {
        $(".btn-actions").eq(index).on("click", this.handleBtnActionsCb.bind(this, index))
    }
    handleBtnActionsCb(index) {
        var id = $(".btn-actions").eq(index).parent().attr("data-id");
        //拿到当前行的数据
        for (var i = 0; i < this.dataList.length; i++) {
            if (id == this.dataList[i]._id) {
                this.activeBooksInfo = this.dataList[i];
                break;
            }
        }


        this.updateBooksName = $("#updatebooksName");
        this.updatebooksAuth = $("#updatebooksAuth")
        this.updatebooksIntroduction = $("#updatebooksIntroduction")
        this.updatebooksType = $("#updatebooksType")
        this.updatebooksStatus = $("#updatebooksStatus")
        this.updateBooksForm = $("#updateBooksForm");

        this.updateBooksName.val(this.activeBooksInfo.booksName);
        this.updatebooksAuth.val(this.activeBooksInfo.booksAuth);
        this.updatebooksIntroduction.val(this.activeBooksInfo.booksIntroduction);
        this.updatebooksType.val(this.activeBooksInfo.booksType.join());
        this.updatebooksStatus.val(this.activeBooksInfo.booksStatus);

        this.modifyBooks();
    }
    modifyBooks() {
        this.updateBooksForm.on("submit", this.handleModifyBooksCb.bind(this))
    }
    handleModifyBooksCb(e) {

        e.preventDefault();
        this.activeBooksInfo.booksName = this.updateBooksName.val();
        this.activeBooksInfo.booksAuth = this.updatebooksAuth.val();
        this.activeBooksInfo.booksIntroduction = this.updatebooksIntroduction.val();
        this.activeBooksInfo.booksType = this.updatebooksType.val();
        this.activeBooksInfo.booksStatus = this.updatebooksStatus.val();


        $.ajax({
            type: "post",
            url: "/books/update",
            data: this.activeBooksInfo,
            success: this.handleMofidySucc.bind(this)
        })
    }
    handleMofidySucc(data) {
        if (data.data.code == 1) {
            alert(data.data.info);
            $('#booksModal').modal('hide')
            this.getBooksList(this.booksListData);
        } else {
            alert(data.data.info)
        }
    }
    //上传图片
    upload() {
        $("#updatebooksImage").on("change", this.handleUploadCb.bind(this))
    }
    handleUploadCb() {
        var file = $("#updatebooksImage")[0].files[0];

        // 1、模拟form表单上传文件   new FileReader 文件转换base64  dataUrl(小)
        var formData = new FormData();
        //2、将需要上传的对象通过append添加到formData中去 第一个参数是key值  第二个参数是value值
        formData.append("booksUrl", file)


        $.ajax({
            type: "post",
            url: "/upload/image",
            //3、取消JQ中ajax的默认配置项
            cache: false,
            processData: false,
            contentType: false,
            data: formData,
            success: this.handleUploadSucc.bind(this)
        })
    }
    handleUploadSucc(data) {
        if (data.data.code == 1) {
            var img = $("<img/>");
            img.attr("src", data.data.url);
            img.css({
                width: 85,
                height: 120
            })
            $(".upload>div").html(img);

            this.activeBooksInfo.booksUrl = data.data.url;
            console.log(this.activeBooksInfo)
        }
    }
    booksSearch(){
       $(".form-search").on("submit",this.handleBooksSearchCb.bind(this))
    }
    handleBooksSearchCb(e){
        e.preventDefault();

        var searchName = $("#booksName_search").val();
        var searchType = $("#booksType_search").val();
        var searchStatus = $("#booksStatus_search").val();
        $.ajax({
            type:"get",
            url:"/books/search",
            data:{
                searchName,
                searchType,
                searchStatus,
                pageSize:5,
                page:1
            },
            success:this.handleBooksSearchSucc.bind(this)
        })

    }
    handleBooksSearchSucc(data){
        this.flag = true;
       this.handleGetBooksListSucc(data)
    }
}

BooksAction.template = `
    <div class="booksActions">
        <form class="form-search form-inline">
            <div class="form-group">
                <label for="booksName_search">书籍名称</label>
                <input type="text" class="form-control" id="booksName_search" placeholder="请输入要搜索的书籍名称">
            </div>
            <div class="form-group">
                <label for="booksStatus_search">书籍状态</label>
                <select class="form-control" id="booksStatus_search">
                    <option value="">全部</option>
                    <option value="连载中">连载中</option>
                    <option value="已完结">已完结</option>
                </select>
            </div>
            <div class="form-group">
            <label for="booksType_search">书籍类型</label>
            <select class="form-control" id="booksType_search">
                <option value="">全部</option>
                <option value="玄幻">玄幻</option>
                <option value="修仙">修仙</option>
                <option value="爱情">爱情</option>
                <option value="动作">动作</option>
            </select>
        </div>
            <button type="submit" class="btn btn-primary">搜索</button>
        </form>
        <table class="table table-striped">
           <thead>
                <tr>
                    <th>书籍名称</th>
                    <th>作者</th>
                    <th>书籍封面</th>
                    <th>书籍类型</th>
                    <th>书籍状态</th>
                    <th>操作</th>
                </tr>
           </thead>
           <tbody>
                <tr>
                    <td>完美世界</td>
                    <td>辰东</td>
                    <td><img style="width:50px;height:70px;" src="../../../img/1578736782091-u=3508817781,1654561115&fm=58&s=6D83639716736DB3087070600300E070.jpg"/></td>
                    <td>
                        <span>武侠</span>
                        <span>爱情</span>
                        <span>修仙</span>
                    </td>
                    <td>
                        连载中
                    </td>
                    <td>
                        <button type="button" class="btn btn-link ">操作</button>
                        <button type="button" class="btn btn-link ">删除</button>
                    </td>
                </tr>
           </tbody>
        </table>
        <div id="pageList"></div>
    </div>
`