import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCxubiPCrfQmKKaNONa-a1i7VLsTdlw6jM",
    authDomain: "hoclaptrinh-e8e1c.firebaseapp.com",
    projectId: "hoclaptrinh-e8e1c",
    storageBucket: "hoclaptrinh-e8e1c.appspot.com",
    messagingSenderId: "578048916636",
    appId: "1:578048916636:web:ac06a4469566d39bcc4159",
    measurementId: "G-P6XVJ3QS2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider().addScope('email')
export const providerFacebook = new FacebookAuthProvider().addScope('email')
export const providerGithub = new GithubAuthProvider()