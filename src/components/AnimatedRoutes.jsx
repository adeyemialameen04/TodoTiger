import { Routes, Route, useNavigate } from "react-router";
import Auth from "./Authentication/Auth";
import AddTodo from "../Pages/AddTodos/AddTodo";
import Todos from "../Pages/Todos/Todos";
import { auth } from "../config/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import NotFound from "../Pages/NotFound/NotFound";

const AnimatedRoutes = ({ getTodos, onAddTodo }) => {

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/newTodo" element={<AddTodo getTodos={getTodos} onAddTodo={onAddTodo} />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AnimatedRoutes;