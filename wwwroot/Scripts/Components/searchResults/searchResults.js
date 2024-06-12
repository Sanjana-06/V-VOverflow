//var searchResults = {
//    intr: null,
//    start_action: function (data, tag) {
//        searchResults.intr = setInterval(function () {
//            Utils.populate_Tool_tasks(searchResults.intr, "#Table_searchResults");
//        }, 1000 * 5);
//        new TemplateRenderer(data, tag, "~/wwwroot/Scripts/Components/searchResults/searchResults.html", null, false).start_action();
//    },
//    click_button: function (e) {

//        location.reload();
//    },
//}
var searchResults = {
    intr: null,
    start_action: function (data, tag) {
        searchResults.intr = setInterval(function () {
            /*Utils.populate_Tool_tasks(searchResults.intr, "#Table_searchResults");*/
        }, 1000 * 5);
        new TemplateRenderer(data, tag, "~/wwwroot/Scripts/Components/searchResults/searchResults.html", null, false).start_action();
    },
    click_button: function (e) {
        location.reload();
    },
    displayResults_old: function (results) {
        //debugger;
        var searchResultsContainer = document.getElementById("searchResultsContainer");
        searchResultsContainer.innerHTML = "";

        results.forEach(function (result) {
            var listItem = document.createElement("div");
            listItem.className = "card bg-white mb-3 mx-5";
            listItem.innerHTML = `<a href="#" class="list-group-item list-group-item-action">
            <div class="card-body">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${result.Email}</h5>
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1" style="color: #000000;">${result.QuestionText}</h5>
                </div>
            </div>
        </a>`;
            searchResultsContainer.appendChild(listItem);
        });
    },
    displayResults: function () {
        //debugger;
        var searchResultsContainer = $("#search").val();// document.getElementById("search");
        searchResultsContainer.innerHTML = "";

        let uri = "/VnVOverflow/Home/SearchQuestions?searchQuery=" + searchResultsContainer;
        $.ajax({
            url: uri,
            method: "GET",
            success: function (response) {
                let data = JSON.parse(response);
                console.log("Successfully submitted");
                $("#searchResultsContainer").empty();
                for (var i = 0; i < data.length; i++) {
                    var listItem = document.createElement("div");
                    listItem.className = "card bg-white mb-3 mx-5";
                    listItem.innerHTML = '<a href="#" class="list-group-item list-group-item-action"><div class="card-body"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + data[i].Email + '</h5></div><div class="d-flex w-100 justify-content-between"><h5 class="mb-1" style="color: #000000;">'+ data[i].QuestionText +'</h5></div></div></a>';
                    $("#searchResultsContainer").append(listItem);
                }
                
            },

            error: function (e) {
                console.error('Error occurred:', e);
            }

        })

        //results.forEach(function (result) {
        //    var listItem = document.createElement("div");
        //    listItem.className = "card bg-white mb-3 mx-5";
        //    listItem.innerHTML = `<a href="#" class="list-group-item list-group-item-action">
        //    <div class="card-body">
        //        <div class="d-flex w-100 justify-content-between">
        //            <h5 class="mb-1">${result.Email}</h5>
        //        </div>
        //        <div class="d-flex w-100 justify-content-between">
        //            <h5 class="mb-1" style="color: #000000;">${result.QuestionText}</h5>
        //        </div>
        //    </div>
        //</a>`;
        //    searchResultsContainer.appendChild(listItem);
        //});
    }
};
//    displayResults: function (results) {
//        var searchResultsContainer = document.getElementById("searchResultsContainer");
//        searchResultsContainer.innerHTML = "";

//        results.forEach(function (result) {
//            var listItem = document.createElement("div");
//            listItem.className = "card bg-white mb-3 mx-5";
//            listItem.innerHTML = `<a href="#" class="list-group-item list-group-item-action">
//                <div class="card-body">
//                    <div class="d-flex w-100 justify-content-between">
//                        <h5 class="mb-1">${result.email}</h5>
//                    </div>
//                    <div class="d-flex w-100 justify-content-between">
//                        <h5 class="mb-1" style="color: #000000;">${result.question}</h5>
//                    </div>
//                </div>
//            </a>`;
//            searchResultsContainer.appendChild(listItem);
//        });
//    }
//};
