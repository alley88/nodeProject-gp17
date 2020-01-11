class UsersAction{
    constructor(){
        this.container = $(".list-content")
    }
    init(){
        this.createContent();
    }
    createContent(){
        this.container.html(UsersAction.template)
    }
}
UsersAction.template = `
    <div>UsersAction</div>
`