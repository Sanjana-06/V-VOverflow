var WhatPeopleSay = {
    start_action: function (tag, data) {
        (new TemplateRenderer(data, tag, "~/wwwroot/Scripts/Components/ReUse/WhatPeopleSay/WhatPeopleSay.html", null, false).start_action()).then(value => {
            $('#' + data.carsousal_id).owlCarousel({
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