import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcO0yxzZAtSPD9ABrLH9ShhMe3q95RlHc",
  authDomain: "note-app-bf576.firebaseapp.com",
  databaseURL: "https://note-app-bf576.firebaseio.com",
  projectId: "note-app-bf576",
  storageBucket: "note-app-bf576.appspot.com",
  messagingSenderId: "415156591318",
  appId: "1:415156591318:web:c52d71b8004b04f25a0777",
  measurementId: "G-QH7RG9V353"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
