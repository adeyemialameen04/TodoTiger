import { useEffect, useState } from "react";
import "./auth.css";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/newTodo");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
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
    <div>
      <Link to="/newTodo">Proceed to App</Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Auth;