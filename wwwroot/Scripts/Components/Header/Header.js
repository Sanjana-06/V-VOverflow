//var Header = {
//    start_action: function () {
//        (new TemplateRenderer({ obj: "TheHeader" }, "Header", "~/wwwroot/Scripts/Components/Header/Header.html").start_action()).
//            then(value => {
//            function TakeNavLinkAction(link) {
//                $(".nav-link").removeClass("active");
//                link.addClass("active");
//            }
//            $(".nav-link").on("click", (e) => TakeNavLinkAction($(e.target)));

            

//            let url = window.location.pathname; // Returns path only (/path/example.html)
//            let current_link = "a[class*='nav-link'][href='_URL_']".replace(/_URL_/, url);
//            TakeNavLinkAction($(current_link));

//            //$.each($(".nav-link"), function (index, ele) {
//            //    if ($(ele).attr("href") === url) {
//            //        TakeNavLinkAction($(ele));
//            //    }
//            //});

//            //let ele = $("#header");
//            //ele.css({ transform: 'rotateY(90deg)', "z-index": 10000 });
//            //$({ "deg": 90 }).animate({ "deg": 0 }, {
//            //    duration: 2000,
//            //    step: function () {
//            //        ele.css({ transform: 'rotateY(' + this.deg + 'deg)', });
//            //    },
//            //    complete: function () {
//            //        fold = false;
//            //    }
//            //});

//            //let ele = $("#header");
//            //ele.css({ transform: 'rotateY(90deg)', "z-index": 10000 });
//            //let done = false, fold = false;
//            //function TakeAction() {
//            //    if ($(window).scrollTop() > ele.height()) {
//            //        if (fold) return;
//            //        fold = true;
//            //        $({ "deg": 0 }).animate({ "deg": 90 }, {
//            //            duration: 2000,
//            //            step: function () {
//            //                ele.css({ transform: 'rotateY(' + this.deg + 'deg)', });
//            //            },
//            //            complete: function () {
//            //                done = false;
//            //            }
//            //        });
//            //    } else {
//            //        if (done) return;
//            //        done = true;
//            //        $({ "deg": 90 }).animate({ "deg": 0 }, {
//            //            duration: 2000,
//            //            step: function () {
//            //                ele.css({ transform: 'rotateY(' + this.deg + 'deg)', });
//            //            },
//            //            complete: function () {
//            //                fold = false;
//            //            }
//            //        });
//            //    }
//            //}
//            //$(window).scroll(function () {
//            //    TakeAction();
//            //}); TakeAction();
//            //$('.back-to-top').click(function () {
//            //    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
//            //    return false;
//            //});

//        });
//    }
//}

var Header = {
    start_action: function () {
        (new TemplateRenderer({ obj: "TheHeader" }, "Header", "~/wwwroot/Scripts/Components/Header/Header.html").start_action()).
            then(value => {
                function TakeNavLinkAction(link) {
                    $(".nav-link").removeClass("active");
                    link.addClass("active");
                }
                $(".nav-link").on("click", (e) => TakeNavLinkAction($(e.target)));

                let url = window.location.pathname; // Returns path only (/path/example.html)
                let current_link = "a[class*='nav-link'][href='_URL_']".replace(/_URL_/, url);
                TakeNavLinkAction($(current_link));

                function validateSearchForm() {
                    var searchText = document.getElementById("search").value;
                    if (searchText.trim() === "") {
                        alert("Please enter a query before searching.");
                        return false; // Prevent form submission
                    }
                    return true; // Allow form submission
                }
            });
    },
    displayResults: function () {
        debugger;
        var searchResultsContainer = $("#search").val();// document.getElementById("search");
        searchResultsContainer.innerHTML = "";

        let uri = "/VnVOverflow/Home/SearchQuestions?searchQuery=" + searchResultsContainer;
        $.ajax({
            url: uri,
            method: "GET",
            success: function (data) {
                console.log("Successfully submitted");
                $("#searchResultsContainer").empty();
                for (var i = 0; i < data.length; i++) {
                    var listItem = document.createElement("div");
                    listItem.className = "card bg-white mb-3 mx-5";
                    listItem.innerHTML = '<a href="#" class="list-group-item list-group-item-action"><div class="card-body"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + data[i].Email + '</h5></div><div class="d-flex w-100 justify-content-between"><h5 class="mb-1" style="color: #000000;">' + data[i].QuestionText + '</h5></div></div></a>';
                    $("#searchResultsContainer").append(listItem);
                }

            },

            error: function (e) {
                console.error('Error occurred:', e);
            }

        })

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
    }
}
