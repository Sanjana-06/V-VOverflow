var allQueries = {
    start_action: function (data, tag) {
        $.ajax({
            url: config.contextPath + "Home/GetAllQuestions"
        }).done(jData => {
            data = JSON.parse(jData);
            var theRows = {};
            theRows.rows = data
            //alert(JSON.stringify(theRows))
            new TemplateRenderer(theRows, tag, "~/wwwroot/Scripts/Components/allQueries/allQueries.html", null, false, false).start_action()
        });
    }
};
