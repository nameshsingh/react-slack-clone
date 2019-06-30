import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

  var firebaseConfig = {
    apiKey: "AIzaSyDfUcR-EJSIk-jNSqu9u8NFhnp5m1qwZTg",
    authDomain: "react-slack-clone-39bcc.firebaseapp.com",
    databaseURL: "https://react-slack-clone-39bcc.firebaseio.com",
    projectId: "react-slack-clone-39bcc",
    storageBucket: "react-slack-clone-39bcc.appspot.com",
    messagingSenderId: "393975912901",
    appId: "1:393975912901:web:50056595340c0434"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;