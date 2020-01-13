class AddBooks {
    constructor() {
        this.container = $(".list-content");
        this.booksInfo = {};
        this.booksTypeFlag = false;
    }
    init() {
        this.createContent();
    }
    createContent() {
        this.container.html(AddBooks.template);
        this.upload();
        this.add();
        this.booksTypesChange();
    }
    upload() {
        $("#booksImage").on("change", this.handleUploadCb.bind(this))
    }
    handleUploadCb() {
        var file = $("#booksImage")[0].files[0];

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

            this.booksInfo.booksUrl = data.data.url;
        }
    }
    add() {
        $("#addBooksForm").on("submit", this.handleAddBooksCb.bind(this))
    }
    handleAddBooksCb(e) {
        e.preventDefault();
        if (this.booksTypeFlag) {
            this.booksInfo.booksName = $("#booksName").val();
            this.booksInfo.booksAuth = $("#booksAuth").val();
            this.booksInfo.booksIntroduction = $("#booksIntroduction").val();
            this.booksInfo.booksType = $("#booksType").val()
            this.booksInfo.booksStatus = $("#booksStatus").val();

            $.ajax({
                type: "post",
                url: "/books/add",
                data: this.booksInfo,
                success: this.handleAddBooksSucc.bind(this)
            })
        }else{
            alert("书籍类型格式有误")
        }


    }
    handleAddBooksSucc(data) {
        if (data.data.code == 1) {
            alert("添加成功");
            new SliderBar().handleTabBarCb(2);
        }
    }
    booksTypesChange() {
        $("#booksType").on("change", this.handleBooksTypesChange.bind(this))
    }
    handleBooksTypesChange(e) {
        var val = e.target.value;
        console.log(val);
        if (/^([\u4e00-\u9fa5]+,?){1,4}$/.test(val)) {
            this.booksTypeFlag = true;
        }
    }
}

AddBooks.template = `
    <div class="booksForm">
        <form id="addBooksForm">
            <div class="form-group">
                <label for="booksName">书籍名称</label>
                <input type="text" class="form-control" id="booksName" placeholder="请输入书籍名称">
            </div>
            <div class="form-group">
                <label for="booksAuth">书籍作者</label>
                <input type="text" class="form-control" id="booksAuth" placeholder="请输入书籍作者">
            </div>
            <div class="form-group">
                <label for="booksIntroduction">书籍简介</label>
                <textarea class="form-control" rows="3" placeholder="请输入书籍简介" id="booksIntroduction"></textarea>
            </div>
            <div class="form-group">
                <label for="booksType">书籍类型</label>
                <input type="text" class="form-control" id="booksType" placeholder="请选择书籍类型">
            </div>
            <div class="form-group">
                <label for="booksStatus">书籍状态</label>
                <select class="form-control" id="booksStatus">
                    <option>已完结</option>
                    <option>连载中</option>
                </select>
            </div>
            <div class="form-group">
            <label for="booksImage">书籍封面</label>
                <div class="upload">
                    <div>
                        <span>+</span>
                    </div>
                    <input type="file"  id="booksImage">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">添加书籍</button>
        </form>
    </div>
`