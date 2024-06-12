var AboutMe = {
    animation_started: false,
    TheMessage: "I am a Developer/V&V/Quality/Safety/Other. I want to learn about SPA and Mobile developement. Do we having such trainings? I also need some expert advice on my Architecture/Code/Test Strategy/Multithreading/Sockets/WebSockets/Product Evolution Strategy, can we discuss . . .",
    start_action: function () {
        //we use HandleBar
        new TemplateRenderer({ obj: "AboutMe" }, "AboutMe", "~/wwwroot/Scripts/Components/AboutMe/AboutMe.html", undefined, false).start_action()
            .then((jData) => {
                $('#bookMsg').attr({ "placeholder": this.TheMessage });
            });
    },
    click_book: function (e) {
        debugger;
        //alert("Hello " + $("#name").val()+" we are adding your information in our database.");
        e.preventDefault();
        $("#SuccessMessage").css({ display: "block" });
        AboutMe.save_user_info(e)
    },
    save_user_info: function (e) {
        let userInfo = new Object();
        userInfo.Name = $("#name").val();
        userInfo.Email = $("#email").val();
        userInfo.Phone = $("#phone").val();
        userInfo.Message = $("#bookMsg").val();
        userInfo.Designation = $("#designation").val();

        

        $.ajax({
            //url: config.contextPath + "/Home/AddUser",
            url: "http://localhost:59512/Home/AddUserInfo",
            //url: "https://adm-constellation-map.alstom.hub/TEKbytes/Home/AddUserInfo",
            type: "POST",
            data: userInfo,
            async: false,
            success: function (data) {
                parseData = JSON.parse(data);
                $("#name").val("");
                $("#email").val("");
                $("#phone").val("");
                $("#bookMsg").val("");
                $("#designation").val("");
            },
            error: function (e) {
                alert('Error occurred!' + e);
            }
        });
    }
}