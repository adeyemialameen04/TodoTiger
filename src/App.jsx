import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./components/Authentication/Auth";
import Todos from "./Pages/Todos/Todos";
// import AddTodo from "./Todos/AddTodo";


import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import AddTodo from "./Pages/AddTodos/AddTodo";
import Navbar from "./components/Navbar/Navbar";


function App() {
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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/newTodo" element={<AddTodo getTodos={getTodos} onAddTodo={handleAddToTodo} />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </Router>
  );
}

export default App;
