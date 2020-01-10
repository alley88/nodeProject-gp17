class Page{
    constructor(){
        this.user = $("#user");
    }
    init(){
        this.createContent(true);
    }
    createContent(flag){
        if(flag){
            this.register = new Register(this.user).init();
        }else{
            this.login = new Login(this.user).init();
        }
    }
}

new Page().init();