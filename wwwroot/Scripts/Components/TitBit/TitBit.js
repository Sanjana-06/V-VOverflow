var TitBit = {
    animation_started:false,
    start_action: function () {
        //we use HandleBar
        new TemplateRenderer({ obj: "TitBit" }, "TitBit", "~/wwwroot/Scripts/Components/TitBit/TitBit.html", undefined, false).start_action();
    },
    Osibisa_Click: function (e) {
        if (TitBit.animation_started) return;
        TitBit.animation_started = true;
        let $ele = $(e.target).closest(".iframe-bk");
        $ele.animate({ opacity: 1 },3000);
        $(":animated").promise().done(() => {
            $ele.animate(
               { opacity: 0 },1000,
                function () {
                    $ele.hide();
                    setTimeout(function () {
                        $('#oojah').attr({ 'src': 'https://www.youtube.com/embed/_oXvpvVEPz0?autoplay=1' });
                    }, 500);
                }
            )
        });
    }
}