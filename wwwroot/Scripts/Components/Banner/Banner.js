var Banner = {
    html_short_cut: '<a target="_self" href="#_ID_" class="btn rounded-pill border border-1 border-custom text-white text-capitalize ms-1" style="font-weight:600; font-size:12px;">_TEXT_</a >',
    cont_short_cut: "div[short_cuts]",
    start_action: function () {
        new TemplateRenderer({ obj: "TheBanner" }, "Banner", "~/wwwroot/Scripts/Components/Banner/Banner.html").start_action().
            then(jData => {
                setTimeout(() => {
                    new bootstrap.Carousel(document.querySelector('#carouselExampleCaptions')).cycle(true)
                }, 2000)
            });
    },
    Show_ShortCuts(shortcuts) {
        let timer = setInterval(() => {
            if ($(Banner.cont_short_cut).length > 0) {
                clearInterval(timer);
                Banner.Show_ShortCuts_internal(shortcuts);
            }
        }, 500);
    },
    SetBannerTitles: function (b_t_1, b_t_1_color, b_st_1, b_t_2, b_t_2_color, b_st_2) {
        let timer = setInterval(() => {
            if ($("#b_t_1").length > 0) {

                if (null === b_t_1_color) b_t_1_color = "white";
                if (null === b_t_2_color) b_t_2_color = "white";

                $("#b_t_1").html(b_t_1).css({ "color": b_t_1_color });

                if (null === b_st_1) $("#b_st_1").hide()
                else $("#b_st_1").html(b_st_1).show();

                $("#b_t_2").html(b_t_2).css({ "color": b_t_2_color });

                if (null === b_st_2) $("#b_st_2").hide()
                else $("#b_st_2").html(b_st_2).show();;

                clearInterval(timer);
            }
        }, 500);
    },
    Show_ShortCuts_internal: function (shortcuts) {
        if (!shortcuts || shortcuts.length <= 0) return;
        $(Banner.cont_short_cut).empty();
        shortcuts.forEach(short_cut => {
            let html = Banner.html_short_cut.replace('_ID_', short_cut.id).replace('_TEXT_', short_cut.text);
            $(html).appendTo(Banner.cont_short_cut)
        });
    },
    remove_short_cuts: function () {
        let timer = setInterval(() => {
            if ($(Banner.cont_short_cut).length > 0) {
                clearInterval(timer);
                $(Banner.cont_short_cut).empty();
            }
        }, 500);
    },
    html_special: '<img src="_SRC_" class="img_fluid" />',
    cont_special: "div[special]",
    Show_Specials(img_id) {
        $(Banner.cont_special).empty();
        let timer = setInterval(() => {
            if ($(Banner.cont_special).length > 0) {
                clearInterval(timer);
                Banner.Show_Specials_Internal(img_id);
            }
        }, 500);
    },
    Show_Specials_Internal: function (img_src) {
        let html = Banner.html_special.replace('_SRC_', img_src);
        $(html).appendTo(Banner.cont_special)
        $("img[car_img]").height(600);
    },
    remove_specials: function () {
        let timer = setInterval(() => {
            if ($(Banner.cont_special).length > 0) {
                clearInterval(timer);
                $(Banner.cont_special).empty();
                $("img[car_img]").height(500);
            }
        }, 500);
    },
    add_special_html(theHTML) {
        let timer = setInterval(() => {
            if ($(Banner.cont_special).length > 0) {
                clearInterval(timer);
                $(Banner.cont_special).html(theHTML)
                $("img[car_img]").height(600);
            }
        }, 500);
    }
}