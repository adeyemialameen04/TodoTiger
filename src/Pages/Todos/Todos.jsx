import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import AddTodo from "../AddTodos/AddTodo";
import DisplayTodo from "./DisplayTodo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const todosRfef = "todos";
  const ref = collection(db, todosRfef);

  const getTodos = async () => {
    try {
      const data = await getDocs(ref);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setTodos(filteredData);
      console.log(todos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  return (
    <div>
      {/* <AddTodo getTodos={getTodos} onAddTodo={handleAddToTodo} /> */}
      <DisplayTodo getTodos={getTodos} todos={todos} reference={ref} />
    </div>
  );
};

export default Todos;