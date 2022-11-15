importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
const firebaseConfig = {
  apiKey: 'AIzaSyAtzGIOpOP8wL1UeRbiK071GrCawOilll0',
  authDomain: 'shi-notifications.firebaseapp.com',
  projectId: 'shi-notifications',
  storageBucket: 'shi-notifications.appspot.com',
  messagingSenderId: '340820491331',
  appId: '1:340820491331:web:02fb97041f6b293a5aa8f6',
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
