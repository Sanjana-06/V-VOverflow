importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');
///////////////////This has to be in the begning else damar, this event handler and messaging.setBackgroundMessageHandler will clash///////////////////////////
self.addEventListener('notificationclick', function (event) {
    console.log('SW notification click event', event)
    const url = event.notification.data.click_action
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(windowClients => {
            //localStorage.setItem("hegde", event.notification.data.hegde); //localstorage cannot be accessed here due to security reasons
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                //return clients.openWindow("http://localhost:55160/Home/Contacts");
                return clients.openWindow(url);
                //return clients.openWindow(url + "?hegde=" + event.notification.data.hegde);
            }
        }));
})
///////////////////This has to be in the begning else damar, this event handler and messaging.setBackgroundMessageHandler will clash///////////////////////////

const firebaseConfig = {
    apiKey: "AIzaSyB1Hrlek2Qu9HNrxXKSnOmd6MqZ5W3nzPw",
    authDomain: "tekbites-c130e.firebaseapp.com",
    projectId: "tekbites-c130e",
    storageBucket: "tekbites-c130e.appspot.com",
    messagingSenderId: "552868363827",
    appId: "1:552868363827:web:532f633488e6cf40a5ad46",
    measurementId: "G-J7734CC2M8"
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log("Received something" + payload);
    const notification = JSON.parse(payload);
    const notificationOption = {
        body: notification.body,
        icon: notification.icon,
        click_action: "https://www.msn.com/en-in"
    };
    return self.registration.showNotification(payload.notification.title, notificationOption);
});

