import firebase from "firebase";


var firebaseConfig = {
    apiKey: "AIzaSyBw6OWIR3dGKHLzrfhEpB0FdO13TUnG_gI",
    authDomain: "todo-list-app-bebf4.firebaseapp.com",
    projectId: "todo-list-app-bebf4",
    storageBucket: "todo-list-app-bebf4.appspot.com",
    messagingSenderId: "980544784456",
    appId: "1:980544784456:web:974ac5c14cb4a8e08d307d"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export {db}