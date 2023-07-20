import { useEffect, useState } from "react";
import "./auth.css";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div>
        <button onClick={signin}>Sign in with google</button>
      </div>
    );
  }

  return (
    <div>Auth</div>
  );
};

export default Auth;