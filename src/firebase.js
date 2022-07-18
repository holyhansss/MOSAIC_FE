// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
          getAuth,
          GoogleAuthProvider,
          signInWithPopup,
          signOut,
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          updateProfile
        } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import profile from './img/profile.png';
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

const googleProvider = new GoogleAuthProvider();

// 구글로 로그인
export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const username = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      sessionStorage.setItem("name",username);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("profilePic", profilePic);
      sessionStorage.setItem("isLogin", true);
      window.location.replace('/');
    })
    .catch((error) => {
      console.log(error);
    });
};

// 이메일로 회원가입
export const signUpWithEmailAndPassword = (email, password, name) => {
  createUserWithEmailAndPassword(auth, email, password, name)
    .then(async (userCredential) => {
      const user = userCredential.user;

      await updateProfile(auth.currentUser, { displayName: name, photoURL: profile })
      window.location.replace("/login");
      alert("가입 완료");
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        alert("이미 가입된 이메일입니다.")
      } else if (errorCode === "auth/invalid-email") {
        alert("유효하지 않은 이메일 주소입니다.")
      } else {
        alert("회원 가입 실패")
      }
    });
    
};
  
// 이메일로 로그인
export const signInWithEmail = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const username = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      sessionStorage.setItem("name", username);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("profilePic", profilePic);
      sessionStorage.setItem("isLogin", true);
      window.location.replace("/");  
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

// 로그아웃
export const logout = () => {
  signOut(auth)
    .then(()=> {
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("profilePic");
      sessionStorage.setItem("isLogin", false);
      window.location.replace("/");  
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  })
}

//Database
export const dbService = getFirestore();
