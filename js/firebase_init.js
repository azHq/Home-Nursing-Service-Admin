// Your web app's Firebase configuration
$(document).ready(function(){
  var firebaseConfig = {
    apiKey: "AIzaSyCuBdJWbGseJSGjSVjFMgGmyP-tqSVIXyY",
    authDomain: "home-nursing-service-3e457.firebaseapp.com",
    databaseURL: "https://home-nursing-service-3e457.firebaseio.com",
    projectId: "home-nursing-service-3e457",
    storageBucket: "home-nursing-service-3e457.appspot.com",
    messagingSenderId: "568782012826",
    appId: "1:568782012826:web:ef2239496b3c30e89f3a23"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  firebase.analytics.isSupported().then((isSupported) => {
    if (isSupported) {
      analytics = firebase.analytics();
      
    }
  });
});
