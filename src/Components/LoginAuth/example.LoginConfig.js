import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPW5YYRoV29OKF5VDQ2Z37jMufGasdEPQ",
  authDomain: "bike-service-application-831ac.firebaseapp.com",
  projectId: "bike-service-application-831ac",
  storageBucket: "bike-service-application-831ac.appspot.com",
  messagingSenderId: "463721339349",
  appId: "1:463721339349:web:199027f28858270912055c",
  measurementId: "G-BD591L7088"
};

// Initialize Firebase if it's not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebaseConfig;
