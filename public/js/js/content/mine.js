class Mine{
    constructor(){
        this.container = $(".list-content")
    }
    init(){
        this.createContent();
    }
    createContent(){
        this.container.html(Mine.template)
    }
}

Mine.template = `
    <div>mine</div>
`