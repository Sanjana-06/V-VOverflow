var WorkShop = {
    start_action: function () {
        new TemplateRenderer({ obj: "TheWorkShop" }, "WorkShop", "~/wwwroot/Scripts/Components/WorkShop/WorkShop.html").start_action().
        then(jData => {
            var carousel = new bootstrap.Carousel(document.querySelector('#WorkShop'))
        });
    }
}