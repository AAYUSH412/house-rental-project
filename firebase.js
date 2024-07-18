// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {getAuth,createUsersWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js"
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8SHfwV0EG_k8lJ-r5hYV_SDIH-TghP3k",
  authDomain: "house-rental-fee41.firebaseapp.com",
  projectId: "house-rental-fee41",
  storageBucket: "house-rental-fee41.appspot.com",
  messagingSenderId: "419733203124",
  appId: "1:419733203124:web:0795af27409e3351efcfe1",
  measurementId: "G-CZN4K8340K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

signup.addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementById('emailaddress').value;
    const password=document.getElementById('passcode').value;
    const name=document.getElementById('firstname').value;

    const auth=getAuth;
    const db=getFirestore;


    createUsersWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user=userCredential.user;
      const userData={
        email:email,
        name:name,
        password:password
      };
      const docref=doc(db,"users",user.uid);
      setDoc(docref,userData)
      .then(()=>{
        window.location="indexwebsite.html"
      })
      .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })

    
    signin.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('mail').value;
    const password=document.getElementById('pass').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='indexwebsite.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })
    })
})