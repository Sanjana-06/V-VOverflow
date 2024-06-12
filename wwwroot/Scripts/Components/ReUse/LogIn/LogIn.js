var LogIn = {
    myModal:null,
    start_action: function (data, tag) {
        new TemplateRenderer(data, tag, "~/wwwroot/Scripts/Components/ReUse/LogIn/Login.html", null, false, false).start_action()
    },
    ShowLoginDialog: function () {
        let options = {}; options.focus = true; options.keyboard = true;
        if (LogIn.myModal === null)LogIn.myModal = new bootstrap.Modal(document.getElementById('LogInModal'), options);
        LogIn.myModal.show();
    },
    LogInUser: async function (e, email, pwd) {
        //alert("EMail : " + email + "\nPwd : " + pwd);
        let user_friendly_name = await $.ajax({
            url: config.contextPath + "Home/LogInUser",
            method: "POST",
            data: { "user_email": email, "user_pwd": pwd }
        });
        if (!user_friendly_name) return;
        LogIn.myModal.hide();
        //alert(user_friendly_name);
        BasicAction.user.email = email;
        BasicAction.user.name = user_friendly_name;
        alert("Try your earlier action once again");
    },
};
