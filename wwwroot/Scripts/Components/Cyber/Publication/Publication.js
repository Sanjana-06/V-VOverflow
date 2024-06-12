var Cyber_Publication = {
    start_action: function () {
        new TemplateRenderer({ obj: "Cyber_Publication" }, "Cyber_Publication", "~/wwwroot/Scripts/Components/Cyber/Publication/Publication.html").start_action()
            .then(jData => {
                var cyberData = {
                    id: "Publication_cyber",
                    images: [config.contextPath + "wwwroot/img/Cyber/Presentations/1.jpg", config.contextPath + "wwwroot/img/Cyber/Presentations/2.jpg"
                        , config.contextPath + "wwwroot/img/Cyber/Presentations/3.jpg", config.contextPath + "wwwroot/img/Cyber/Presentations/4.jpg"
                        , config.contextPath + "wwwroot/img/Cyber/Presentations/5.jpg", config.contextPath + "wwwroot/img/Cyber/Presentations/6.jpg"
                        , config.contextPath + "wwwroot/img/Cyber/Presentations/7.jpg", config.contextPath + "wwwroot/img/Cyber/Presentations/8.jpg"
                        , config.contextPath + "wwwroot/img/Cyber/Presentations/9.jpg", config.contextPath + "wwwroot/img/Cyber/Presentations/10.jpg"
                        , config.contextPath + "wwwroot/img/Cyber/Presentations/11.jpg", config.contextPath + "wwwroot/img/Cyber/Presentations/12.jpg"
                        , config.contextPath + "wwwroot/img/Cyber/Presentations/13.jpg", config.contextPath + "wwwroot/img/Cyber/Presentations/14.jpg"
                        , config.contextPath + "wwwroot/img/Cyber/Presentations/15.jpg"],
                };
                (new BootPublication('Publication_cyber', cyberData)).start_action();
            });
    }
}