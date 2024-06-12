var PeopleSay = {
    start_action: function () {
        (new TemplateRenderer({ obj: "PeopleSay" }, "PeopleSay", "~/wwwroot/Scripts/Components/PeopleSay/PeopleSay.html").start_action()).then(value => {
            $('#carousel_PeopleSay').owlCarousel({
                autoplay: true,
                smartSpeed: 2000,
                loop: true,
                nav: false,
                margin: 10,
                items: 3,
                autoplayHoverPause: true,
            });
        })
    }
}