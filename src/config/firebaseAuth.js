// firebase auth config (Google SSO)

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    apiKey: "AIzaSyDMuurisauFcLF9i68xgVhP8Xh-2puvBjA",
    authDomain: "theanythinglibrary-pilot.firebaseapp.com",
    projectId: "theanythinglibrary-pilot",
    storageBucket: "theanythinglibrary-pilot.appspot.com",
    messagingSenderId: "596566470906",
    appId: "1:596566470906:web:93de39e10524457442d943"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();