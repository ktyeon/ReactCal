// firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC4VAxWv0WfGNCM8QA3QdQbr4x9WF4WI5U",
    authDomain: "reactcalendar-dfd43.firebaseapp.com",
    projectId: "reactcalendar-dfd43",
    storageBucket: "reactcalendar-dfd43.appspot.com",
    messagingSenderId: "613002753023",
    appId: "1:613002753023:web:7e136c71de24a6bf1aadca"
  };

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firestore };
