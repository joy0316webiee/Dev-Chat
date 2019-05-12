import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyBJ9p2XyfM06yytpV53EdZSUg1qkldPMvE",
  authDomain: "react-slack-clone-e7fad.firebaseapp.com",
  databaseURL: "https://react-slack-clone-e7fad.firebaseio.com",
  projectId: "react-slack-clone-e7fad",
  storageBucket: "react-slack-clone-e7fad.appspot.com",
  messagingSenderId: "198494632277",
  appId: "1:198494632277:web:91b7931fea98b320"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;