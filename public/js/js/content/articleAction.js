class ArticleAction{
    constructor(){
        this.container = $(".list-content")
    }
    init(){
        this.createContent();
    }
    createContent(){
        this.container.html(ArticleAction.template)
    }
}

ArticleAction.template = `
    <div>ArticleAction</div>
`