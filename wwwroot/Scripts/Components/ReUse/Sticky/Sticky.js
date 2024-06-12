var Sticky = {
    clear_local_storage_for_multiple_clicks:true,
    start_action: function (tag, data) {
        let isNegative = -1; let index = -1;
        data.rows.forEach(row => {
            row.forEach(col => {
                col.india = ++index;
                col.angle = parseInt(Math.random() * 5 * isNegative);
                col.rotate = " rotate(_ANGLE_deg)".replace(/_ANGLE_/g, col.angle);
                //col.title += " <span style='font-weight:normal'>click here</span>";
                isNegative *= - 1;
            });
        })
        new TemplateRenderer(data, tag, "~/wwwroot/Scripts/Components/ReUse/Sticky/Sticky.html", null, false).start_action().
            then(jd => {
                $.ajax({
                    url: config.contextPath + "Home/GetAllThumbsInfo"
                }).then(jdata => {
                    let thumbs_up = JSON.parse(jdata);
                    thumbs_up.forEach(dat => {
                        $("#" + dat.user_identity).text(dat.likes);
                    });
                })
            });
    },
    Handle_Click: function (e) {
        if ($(e.target).is("img")) return;
        let jEle = $(e.target).closest(".collagefr");
        let div_angle = parseInt(jEle.attr('angle'));
        jEle.toggleClass("hov");
        let end = (div_angle < 0) ? div_angle - 360 : 360 + div_angle;
        $({ angle: div_angle }).animate({ angle: end },
            {
                duration: parseInt(Math.random() * 2000) + 500,
                step: function () {
                    let rot = "rotateX(_ANGLE_deg) rotateY(_ANGLE_deg) rotateZ(_ANGLE_deg)".replace(/_ANGLE_/g, this.angle);
                    jEle.css({ transform: rot });
                },
                complete: function () {
                    jEle.toggleClass("hov");
                }
            });
    },
    Handle_Likes: function (e, id) {
        id = id.trim();
        let likes = localStorage.getItem("likes");
        if (Sticky.clear_local_storage_for_multiple_clicks) {
            let j_arr = [];
            if (likes == null) j_arr.push(id);
            else {
                j_arr = JSON.parse(likes);
                if (j_arr.includes(id)) return;
                j_arr.push(id);
            }
            localStorage.setItem("likes", JSON.stringify(j_arr));
        }
        alert("Thank you for liking this picture");        
        let jele = $("#" + id);
        jele.text(parseFloat(jele.text()) + 1);
        $.ajax({
            url: config.contextPath + "Home/UpDateThumbsUpInfo",
            data: { user_identity : id}
        }).then(jd => {
            alert(jd);
        })
    }
}

//class Sticky {
//    start_action(tag, data) {
//        let isNegative = -1; let index = -1;
//        data.rows.forEach(row => {
//            row.forEach(col => {
//                col.india = ++index;
//                col.angle = parseInt(Math.random() * 5 * isNegative);
//                col.rotate = " rotate(_ANGLE_deg)".replace(/_ANGLE_/g, col.angle);
//                //col.title += " <span style='font-weight:normal'>click here</span>";
//                isNegative *= - 1;
//            });
//        })
//        new TemplateRenderer(data, tag, "~/wwwroot/Scripts/Components/ReUse/Sticky/Sticky.html", null, false).start_action();
//    }
//    Handle_Click(e) {
//        if ($(e.target).is("img")) return;
//        let jEle = $(e.target).closest(".collagefr");
//        let div_angle = parseInt(jEle.attr('angle'));
//        jEle.toggleClass("hov");
//        let end = (div_angle < 0) ? div_angle - 360 : 360 + div_angle;
//        $({ angle: div_angle }).animate({ angle: end },
//            {
//                duration: parseInt(Math.random() * 2000) + 500,
//                step: function () {
//                    let rot = "rotateX(_ANGLE_deg) rotateY(_ANGLE_deg) rotateZ(_ANGLE_deg)".replace(/_ANGLE_/g, this.angle);
//                    jEle.css({ transform: rot });
//                },
//                complete: function () {
//                    jEle.toggleClass("hov");
//                }
//            });
//    }
//    Handle_Likes(e, id) {
//        alert("Thank you for liking this picture");
//        let jele = $("#" + id.trim());
//        jele.text(parseFloat(jele.text()) + 1);
//    }
//}