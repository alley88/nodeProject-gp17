class ArticleAction {
    constructor() {
        this.container = $(".list-content")
    }
    init() {
        this.createContent();
    }
    createContent() {
        this.container.html(ArticleAction.template);
        this.getBooksNameSelect();
        this.createwangEditor();
        this.publicArticle();
        
    }
    getBooksNameSelect() {
        $.ajax({
            type: "get",
            url: "/books/booksAll",
            success: this.handleGetBooksNameSelect.bind(this)
        })
    }
    handleGetBooksNameSelect(data) {
        var dataList = data.data.data;
        var str = "";
        for (var i = 0; i < dataList.length; i++) {
            str += `
                <option value="${dataList[i]._id}">${dataList[i].booksName}</option>
           `
        }
        $(".booksList").html(str);
        this.getBooksArticeList();
        this.seletedBooks();
    }
    createwangEditor(){
        this.Editor =  new wangEditor("#content");
        this.Editor.create();
    }
    publicArticle(){
        $("#publicArticle").on("submit",this.handlePublicArticleCb.bind(this))
    }
    handlePublicArticleCb(e){
        e.preventDefault();
        var title = $("#articleTitle").val();
        var content = this.Editor.txt.html();
        var booksInfo = $(".booksList").val();

        
        $.ajax({
            type:"post",
            url:"/article/addArticle",
            data:{
                title,
                content,
                booksInfo

            },
            success:this.handlePublicSucc.bind(this)
        })
    }
    handlePublicSucc(data){
        if(data.data.code == 1){
            alert("添加成功");
            this.getBooksArticeList();
        }
        $('#addArticle').modal('hide')
    }
    getBooksArticeList(){
        var booksInfo = $(".booksList").val();

        $.ajax({
            type:'get',
            url:"/article/articleList",
            data:{
                booksInfo
            },
            success:this.handleGetBooksArticleListSucc.bind(this)
        })
    }
    handleGetBooksArticleListSucc(data){
       var dataList = data.data.data;

       var str = "";

       for(var i=0;i<dataList.length;i++){
           str += `<div data-id=${dataList[i]._id}>${dataList[i].title}</div>
           `
       }

       $(".articleList").html(str);
       this.articleDes();
    }
    seletedBooks(){
        $(".booksList").on("change",this.handleSelectedCb.bind(this))
    }
    handleSelectedCb(){
        this.getBooksArticeList();
    }
    articleDes(){
        $(".articleList>div").each(this.handleArticleListDesEach.bind(this))
    }
    handleArticleListDesEach(index){
        $(".articleList>div").eq(index).on("click",this.handleArticleListDesCb.bind(this,index))
    }
    handleArticleListDesCb(index){
        var booksInfo =  $(".articleList>div").eq(index).attr("data-id");
        window.location.href = "http://10.60.15.150:3000/html/details.html?id="+booksInfo
    }

}

ArticleAction.template = `
    <div class="ArticleAction">
    <div class="form-inline">
        <select class="form-control booksList">
           
        </select>
        <button class="btn btn-primary" data-toggle="modal" data-target="#addArticle">添加章节</button>
    </div>
        <div class="articleList">
            <div>第1章 被杀的光杆一个的皇帝</div>
            <div>第1章 被杀的光杆一个的皇帝</div>
            <div>第1章 被杀的光杆一个的皇帝</div>
            <div>第1章 被杀的光杆一个的皇帝</div>
            <div>第1章 被杀的光杆一个的皇帝</div>
            <div>第1章 被杀的光杆一个的皇帝</div>
            <div>第1章 被杀的光杆一个的皇帝</div>
            <div>第1章 被杀的光杆一个的皇帝</div>
        </div>
        <div class="modal fade" id="addArticle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">添加章节</h4>
                    </div>
                    <div class="modal-body">
                        <form id="publicArticle">
                            <div class="form-group">
                                <label for="articleTitle">章节标题</label>
                                <input type="text" class="form-control" id="articleTitle" placeholder="请输入章节标题">
                            </div>
                           
                            <div class="form-group">
                                <label for="articleTitle">章节内容</label>
                                <div id="content"></div>
                             </div>
                             <button type="submit" class="btn btn-primary">发布</button>
                        </form>
                    </div>
                    </div>
                </div>
        </div>
    </div>
`