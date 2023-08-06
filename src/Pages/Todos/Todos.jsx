import "./todo.css";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import DisplayTodo from "./DisplayTodo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const todosRfef = "todos";
  const ref = collection(db, todosRfef);

  const getTodos = async () => {
    try {
      const data = await getDocs(ref);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(filteredData);
    } catch (error) {
      return <h1>Error: {error}</h1>;
    }
  };

  const handleAddToTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  return (
    <div>
      <DisplayTodo getTodos={getTodos} todos={todos} reference={ref} />
    </div>
  );
};

export default Todos;
