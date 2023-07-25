import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./config/firebase";
import Navbar from "./components/Navbar/Navbar";
import { onAuthStateChanged } from "@firebase/auth";
import AnimatedRoutes from "./components/AnimatedRoutes";


function App() {
  const [todos, setTodos] = useState([]);
  const todosRfef = "todos";
  const ref = collection(db, todosRfef);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const getTodos = async () => {
    try {
      const data = await getDocs(ref);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setTodos(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  return (
    <Router>
      <>
        {
          user ? <Navbar /> : ""
        }
      </>
      <AnimatedRoutes getTodos={getTodos} onAddTodo={handleAddToTodo} />
    </Router>
  );
}

export default App;
