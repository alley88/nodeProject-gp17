class Home{
    constructor(){
        this.container = $(".list-content")
    }
    init(){
        this.createContent();
    }
    createContent(){
        this.container.html(Home.template)
    }
}
Home.template = `
    <div>home</div>
`

