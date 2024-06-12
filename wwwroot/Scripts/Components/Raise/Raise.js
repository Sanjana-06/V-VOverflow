var Raise = {
    intr: null,
    start_action: function (data, tag) {
        //Raise.intr = setInterval(function () {
        //    /* Utils.populate_Tool_tasks(Raise.intr, "#Table_Raise");*/
        //}, 1000 * 5);
        new TemplateRenderer(data, tag, "~/wwwroot/Scripts/Components/Raise/Raise.html", null, false).start_action();
    },
    post_click_button: async function (e) {
        let user_name = await $.ajax({ url: config.contextPath + "Home/GetUserName" });
        if (!user_name) {
            LogIn.ShowLoginDialog();
            return;
        }
        //e.preventDefault();
        let question = $("#question1").val();
        let category = $("#category :selected").val();
        if (!question || !category) {
            alert("All field are mandatory");
            return;
        }
        $.ajax({
            url: config.contextPath + "Home/SubmitQuestion",
            method: "POST",
            data: {
                question: question,
                category: category
            }
        }).then(jData => alert(jData));
    },
};