importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAT11snOZq3zajd_8sZiGHKRPT8nhV2mVQ",
  authDomain: "nagaland-86b03.firebaseapp.com",
  projectId: "nagaland-86b03",
  storageBucket: "nagaland-86b03.appspot.com",
  messagingSenderId: "144382590692",
  appId: "1:144382590692:web:7bcf59a0d10f14b76c76f1",
  measurementId: "G-WT94RXXTSV",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  // Customize notification here
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});
