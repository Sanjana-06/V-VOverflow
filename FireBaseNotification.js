////https://github.com/hackstarsj/FirebaseWebPushNotification
// <script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"></script>
var theFireBaseNotification = {
    //Note : When IntitalizeFireBaseMessaging() executes, Firbase object will look for "firebase-messaging-sw.js" in the root folder,
    //Also no need for Manifest at all.
    firebaseConfig: {},
    messaging: {},
    //backEndURL: "Home/Subscribe",
    backEndURL: "/VnVOverflow/Home/Subscribe",
    roken: null,
    eleJID: "#token",
    start_action: function (fbConfig) {
        theFireBaseNotification.firebaseConfig = fbConfig;
        //firebase.initializeApp(theFireBaseNotification.firebaseConfig);
        if (firebase.apps.length === 0) {
            firebase.initializeApp(theFireBaseNotification.firebaseConfig);
        }
        theFireBaseNotification.messaging = firebase.messaging();
        theFireBaseNotification.attachMessagingMessagesHandlers();
        theFireBaseNotification.IntitalizeFireBaseMessaging();
    },
    IntitalizeFireBaseMessaging: function () {
        theFireBaseNotification.messaging
            .requestPermission()
            .then(function () {
                theFireBaseNotification.display("Obtained Notification Permission")
                return theFireBaseNotification.messaging.getToken();
            })
            .then(function (token) {
                let disp = "Token:\nThis token will be sent to the Backend for Subsciption drama\n" + token
                theFireBaseNotification.display(disp);
                $(theFireBaseNotification.eleJID).html(token);
                theFireBaseNotification.sendToBackEnd(token);
            })
            .catch(function (reason) {
                console.log("Something Damar : " + reason);
            });
    },
    attachMessagingMessagesHandlers: function () {
        theFireBaseNotification.messaging.onMessage(theFireBaseNotification.theMessagingOnMessage);
        theFireBaseNotification.messaging.onTokenRefresh(theFireBaseNotification.theMessagingonTokenRefresh);
    },
    theMessagingOnMessage: function (payload) {
        let disp = "payload : " + JSON.stringify(payload, null, ' ')
        theFireBaseNotification.display(disp);
        const notificationOption = {
            body: payload.notification.body,
            icon: payload.notification.icon
        };
        var pl = payload;
        if (Notification.permission === "granted") {
            var notification = new Notification(payload.notification.title, notificationOption);
            notification.onclick = function (ev) {
                //alert("The payload data : \n" + JSON.stringify(payload, null, ' '));
                ev.preventDefault();
                if (window.location.href !== pl.notification.data.click_action) window.location.href = pl.notification.data.click_action;
                //window.open(pl.notification.click_action, '_blank');
                notification.close();
            }
        }
    },
    theMessagingonTokenRefresh: function () {
        theFireBaseNotification.messaging.getToken()
            .then(function (newtoken) {
                let disp = "New Token : " + newtoken;
                theFireBaseNotification.display(disp);
                theFireBaseNotification.sendToBackEnd(newtoken);
            })
            .catch(function (reason) {
                console.log("DAMAR\n" + reason);
            })
    },
    display: function (disp, consoleAndAlert /*=2, only console, then send 1*/) {
        if (console === undefined) return;
        if (consoleAndAlert === 2) {
            console.log(disp);
            alert(disp);
        } else if (consoleAndAlert == 1) {
            console.log(disp);
        }
    },
    sendToBackEnd: function (token) {
        if (theFireBaseNotification.token !== token) theFireBaseNotification.token = token;
        if (localStorage.getItem("token") === token) return;
        $.ajax({
            method: "POST",
            url: theFireBaseNotification.backEndURL,
            data: { "token": token },
            success: function (jData) {
                alert(jData);
                localStorage.setItem("token", token);
                console.log(jData);
            }
        })
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyAQk_jOOaKtGyGNEmy_EAVWjCyN9YMrVKI",
    authDomain: "the-ccn.firebaseapp.com",
    projectId: "the-ccn",
    storageBucket: "the-ccn.appspot.com",
    messagingSenderId: "652532711926",
    appId: "1:652532711926:web:5384a1a6bf1bbd514c07d7",
    measurementId: "G-DE5NJCFXR0"
};