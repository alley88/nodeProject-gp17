class BooksAction {
    constructor() {
        this.container = $(".list-content");
        this.booksListData = {
            pageSize: 5,
            page: 1
        }
        this.flag = true;
    }
    init() {
        this.createContent();
    }
    createContent() {
        this.container.html(BooksAction.template);
        this.getBooksList(this.booksListData)
    }
    getBooksList({ pageSize, page }) {
        //  limit 10  page 1

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
            var dataList = data.data.data;

        
            for (var i = 0; i < dataList.length; i++) {
                for(var j=0;j<dataList[i].booksType.length;j++){
                    var type = "";
                    type += `
                        <span>${dataList[i].booksType[j]}</span>
                    `
                }

                str += `
                <tr>
                <td>${dataList[i].booksName}</td>
                <td>${dataList[i].booksAuth}</td>
                <td><img src="${dataList[i].booksUrl}"></td>
                <td>
                    ${type}
                </td>
                <td>
                ${dataList[i].booksStatus}
                </td>
                <td>
                    <button type="button" class="btn btn-link">操作</button>
                    <button type="button" class="btn btn-link">删除</button>
                </td>
            </tr>`

            }
            $(".booksActions tbody").html(str);
            if(this.flag){
                this.createPageList(data.data.count)
            }

            this.flag = false;
           
        }
    }
    createPageList(count){
        var _that = this;
        layui.use('laypage', function(){
            var laypage = layui.laypage;
            laypage.render({
              elem: 'pageList' ,
              count,
              limit:5,
              groups:5,
              jump:_that.handleCreatePageListCb.bind(_that)
            });
          });
    }
    handleCreatePageListCb(obj, first){
        if(!first){
           this.getBooksList({pageSize:obj.limit,page:obj.curr})
        }
    }
}

BooksAction.template = `
    <div class="booksActions">
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
                        <button type="button" class="btn btn-link">操作</button>
                        <button type="button" class="btn btn-link">删除</button>
                    </td>
                </tr>
           </tbody>
        </table>
        <div id="pageList"></div>
    </div>
`