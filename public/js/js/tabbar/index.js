class SliderBar {
    constructor() {
        this.TabBar = $(".list-sliderBar>ul>li");
    }
    init() {
        this.TabBarToggle()
        this.handleTabBarCb(5);
    }
    TabBarToggle() {
        this.TabBar.each(this.handleTabBarEach.bind(this))
    }
    handleTabBarEach(index) {
        this.TabBar.eq(index).on("click", this.handleTabBarCb.bind(this, index))
    }
    handleTabBarCb(index) {
        this.TabBar.eq(index).addClass("active").siblings().removeClass("active");

        switch (index) {
            case 0:
                new Home().init();
                break;
            case 1:
                new AddBooks().init();
                break;
            case 2:
                new BooksAction().init();
                break;
            case 3:
                new UsersAction().init();
                break;
            case 4:
                new ArticleAction().init();
                break;
            case 5:
                new Mine().init();
                break;

        }
    }
}

new SliderBar().init();