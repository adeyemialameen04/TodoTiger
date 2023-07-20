import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeiGp-aK_VT6kKpY6oiYWPxmrtW10it-w",
  authDomain: "todotiger-27ff9.firebaseapp.com",
  projectId: "todotiger-27ff9",
  storageBucket: "todotiger-27ff9.appspot.com",
  messagingSenderId: "839534871585",
  appId: "1:839534871585:web:4a0a5aaec2fdf5007dcf60",
  measurementId: "G-MDS6N4TDCR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();