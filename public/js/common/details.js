class Details{
    constructor(){
       this.container = $("#details"); 
       this.init()
    }
    init(){
        var id = this.getBooksId();
        this.getBooksDetails(id);
    }
    getBooksId(){
        var path = window.location.href;
        return path.split("?")[1].split("=")[1]
    }
    getBooksDetails(id){
        $.ajax({
            type:"get",
            url:"/article/details",
            data:{
                booksInfo:id
            },
            success:this.handleGetBooksDetailsSucc.bind(this)
        })
    }
    handleGetBooksDetailsSucc(data){
      
        if(data.data.code == 1){
            var h1 = $("<h1></h1>");
            var div = $("<div class='content'></div>");
            h1.text(data.data.data.title);
            div.html(data.data.data.content);
            this.container.append(h1);
            this.container.append(div);
        }else{
            alert(data.data.info);
            window.location.href="http://10.60.15.150:3000/html/list.html";
        }
    }

}

new Details();