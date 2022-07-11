// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_API_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const username = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      sessionStorage.setItem("name",username);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("profilePic", profilePic);
      // sessionStorage.setItem("isLogin", "true");
      window.location.replace("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const logout = () => {
//   auth.signOut().then((result)=> {
//     console.log('logged out')

//   }).catch((error) => {
//     console.log(error.message)
//   })
// }

//Database
export const dbService = getFirestore();