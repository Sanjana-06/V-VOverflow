//var Query = {
//    intr: null,
//    start_action: function (data, tag) {
//        Query.intr = setInterval(function () {
//           /* Utils.populate_Tool_tasks(allQueries.intr, "#Table_Query");*/
//        }, 1000 * 5);
//        new TemplateRenderer(data, tag, "~/wwwroot/Scripts/Components/Query/Query.html", null, false).start_action();
//    },
//    postsubmitanswer: function () {
//        debugger;
//        let Answers = $("#Answer_email").val();
//        let Answer_email = $("#Answers").val();
//        let uri = "https://localhost:56276/TheCCN/Home/submitAnswer";
//        $.ajax({
//            url: uri,
//                method: "POST",
//                data: {
//                     Answers: Answers,
//                     Answer_email: Answer_email
//                },
//                success: function(data) {
//                console.log("Successfully submitted");
//                } ,
//                error: function(e) {
//                console.error('Error occurred', e);
//                }
//        })

//    },
//};

var Query = {
    intr: null,
    start_action: function (data, tag) {
        Query.intr = setInterval(function () {
            /* Utils.populate_Tool_tasks(allQueries.intr, "#Table_Query");*/
        }, 1000 * 5);
        new TemplateRenderer(data, tag, "~/wwwroot/Scripts/Components/Query/Query.html", null, false).start_action();
    },

    postsubmitanswer: function () {
        let Answers = $("#Answers").val();
        let Answer_email = $("#Answer_email").val();
        let uri = "/VnVOverflow/Home/submitAnswer";
        $.ajax({
            url: uri,
            method: "POST",
            data: {
                questionId: questionId, // Pass the question ID to the server
                Answers: Answers,
                Answer_email: Answer_email
            },
            success: function (data) {
                console.log("Successfully submitted");
                // Refresh the previous answers section
                Query.refreshPreviousAnswers(questionId);
            },
            error: function (e) {
                console.error('Error occurred', e);
            }
        });
    },

    refreshPreviousAnswers: function (questionId) {
        let uri = "https://localhost:56276/TheCCN/Home/GetPreviousAnswers";
        $.ajax({
            url: uri,
            method: "GET",
            data: {
                questionId: questionId // Pass the question ID to retrieve previous answers
            },
            success: function (data) {
                // Update the previous answers section with the retrieved data
                $(".answers-list").html(data);
            },
            error: function (e) {
                console.error('Error occurred', e);
            }
        });
    }
};
