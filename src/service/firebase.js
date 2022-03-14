import { initializeApp } from "firebase/app";
import {
   getAuth, 
   createUserWithEmailAndPassword, 
   signOut,
   signInWithEmailAndPassword } from "firebase/auth";
import $ from 'jquery';

const firebaseConfig = {
    apiKey: "AIzaSyBEwQj8vfYXKTYxCMkOM5N8ZRUotmg-f2Y",
    authDomain: "task-manager-api-4f9a8.firebaseapp.com",
    databaseURL: "https://task-manager-api-4f9a8-default-rtdb.firebaseio.com",
    projectId: "task-manager-api-4f9a8",
    storageBucket: "task-manager-api-4f9a8.appspot.com",
    messagingSenderId: "130549544929",
    appId: "1:130549544929:web:573aff7795adc810e644a0",
    measurementId: "G-5TYPPSS04Z"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const CreateAccount = (email, password, username) => {
    createUserWithEmailAndPassword(auth, email, password, username)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const newUserData = {
          email: email,
          username: username
      };
      $.ajax({
        url:"https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/user/" + user.uid,
        type:"POST",
        data: {newUserData},
        success: function () {
            console.log("Account created");
            window.location.reload();
        }
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + '\n' + errorMessage);
      // ..
    });
};

export const LoginAccount = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + '\n' + errorMessage)
  });
};

export const LogoutAccount = () => {
  signOut(auth).then (() => {
    //Sign out success
  }).catch((error)=> {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + '\n' + errorMessage);
  })
};