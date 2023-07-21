import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { AiOutlinePoweroff } from "react-icons/ai";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();



  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header>
      <div className="container header__container">
        <Link className="logo" to="/newTodo">TodoTiger🐅🐅</Link>
        <nav>
          <Link to="/todos">Todos</Link>
          <button onClick={logout}>
            <AiOutlinePoweroff />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;