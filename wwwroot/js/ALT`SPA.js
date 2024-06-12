// version 1.0 - dependencies $
//feature depricated : Auto call of start_action is removed, feature added : hard coded (transitionSpeed) 500 ms fade-in , fade-out animation , isAnimationRequired -true, false;
var NavComponent = {
    transitionSpeed: 500,
    isAnimationRequired: true,
    actualTag: "specialTag",
    replaceStartTag: "",
    replaceEndTag: "",
    len: 0,
    logInUrl: "/Auth/Index",
    Log_in_page: false,
    xhr: null,
    start_action: function () {
        var _orgAjax = jQuery.ajaxSettings.xhr;
        jQuery.ajaxSettings.xhr = function () {
            NavComponent.xhr = _orgAjax();
            return NavComponent.xhr;
        };
        NavComponent.replaceStartTag = "<" + NavComponent.actualTag + ">";
        NavComponent.replaceEndTag = "</" + NavComponent.actualTag + ">";
        NavComponent.len = NavComponent.replaceStartTag.length;
        $(document).on("click", "a[zora]", NavComponent.home_click);
        window.onpopstate = function (event) {
            //alert("location: " + document.location + ", state: " + JSON.stringify(event.state)); //as per MDN
            if (event == null || event.state == null) return;
            let loc = document.location.href;
            let domainName = document.location.hostname;
            NavComponent.navigate(loc, event.state.id, false);
        };
    },
    replaceHTML: function (homehtml) {
        //first update history then replace body, this way the document.ready of this page will fire after hostoryupdation               
        var newBody = homehtml.substring(homehtml.indexOf(NavComponent.replaceStartTag) + NavComponent.len, homehtml.indexOf(NavComponent.replaceEndTag));
        //var newBody = $(homehtml).filter(NavComponent.actualTag);//if u do this document.ready never gets fired.
        if (!NavComponent.isAnimationRequired) {
            //for smooth page transition
            $("body").hide();
            $(NavComponent.actualTag).html(newBody);
            $("body").show();
        }
        else {
            //$("body").fadeOut(NavComponent.transitionSpeed / 3, function () {
            //    $(NavComponent.actualTag).html(newBody);
            //    $("body").fadeIn(NavComponent.transitionSpeed);
            //});
            $("#specialTag").fadeOut(NavComponent.transitionSpeed, function () {
                $(NavComponent.actualTag).html(newBody);
                $("#specialTag").fadeIn(NavComponent.transitionSpeed);
            });
        }
        $("title").text(homehtml.substring(homehtml.indexOf("<title>") + 7, homehtml.indexOf("</title>")));
    },
    navigate: function (Url, pushID, Push) {
        var puShId = pushID; var theUrl = Url; var toPush = Push;
        $.ajax({
            url: theUrl,
            cache: false,//needed for IE 11 only. yeah !!! IE caches get requests
            //IE caches a get response if the request url is same accross multiple calls, one way to overcome this IE stupidity is, add a query string that keeps varing, this way IE won't cache the response
            //data: { 'uniq_param': (new Date()).getTime(), },             
            success: function (homehtml) {
                var pObj = {}; pObj.id = puShId;
                if (toPush) window.history.pushState(pObj, "No Browser Uses this", theUrl);
                //var urlPath = window.location.pathname;
                if (NavComponent.xhr.responseURL != window.location.href && NavComponent.xhr.responseURL.indexOf(NavComponent.logInUrl) !== -1) {
                    //alert("Detected a redirect\n" + NavComponent.xhr.responseURL + "\n" +  window.location.href);
                    //we detected a redirect, and that redirect is to the above configured logInUrl, so lets refresh the page
                    //alert(NavComponent.xhr.responseURL.indexOf(NavComponent.logInUrl));
                    window.location.href = NavComponent.logInUrl;
                }
                else NavComponent.replaceHTML(homehtml);
				// var urlPath = window.location.pathname;
				//if (NavComponent.Log_in_page && -1 !== homehtml.indexOf("Log_in_page"))window.location.href = NavComponent.logInUrl;
				//else NavComponent.replaceHTML(homehtml);
            },
            error: function (a, b, c) {
                if (a.status == 401 || a.status == 403) { //means forbidden so, u have logged out
                    try {
                        var respObject = JSON.parse(a.responseText);
                        window.location.href = respObject.LogOnUrl;
                    }
                    catch (m) {
                        window.location.href = NavComponent.logInUrl;
                    }
                }
                else NavComponent.replaceHTML("<title>" + b + "</title>" + NavComponent.replaceStartTag + "<div class='jumbotron'><h1 class='display-4'>OOPS !!! We have status -  " + a.responseText + c + " &nbsp; " + "</h1><p class='lead'>This is definetly an issue, with error-code &nbsp;" + a.status + "&nbsp; , our solemn condolences.</p><hr class= 'my-4' ><p>You can contact <a href='mailto:nishitha.b-m@alstomgroup.com'>B.M Nishitha</a> to solve your problems</p></div>" + NavComponent.replaceEndTag);
            }
        });
    },
    SetView: function (url, jtagOrId) {
        $.ajax({ url: url, cache: false }).done(function (jData) {
            $(jtagOrId).html(jData);
        });
    },
    home_click: function (e) {
        e.preventDefault();
        NavComponent.navigate($(e.target).attr("href"), Math.random() * 10000 + 1, true);
    },
}
$(document).ready(NavComponent.start_action);