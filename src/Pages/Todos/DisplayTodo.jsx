import { deleteDoc, doc } from "firebase/firestore";
import { useEffect } from 'react';
import { auth } from "../../config/firebase";
import { Link } from "react-router-dom";
import TodoItem from "./TodoItem";

const DisplayTodo = ({ getTodos, todos, reference }) => {
  const currentUser = auth?.currentUser?.uid;

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const todoDocRef = doc(reference, id);
      await deleteDoc(todoDocRef);
      alert("Todo deleted successfully");
      getTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="todos__section">
      <aside className="container">
        <h1>Hi, {auth?.currentUser?.displayName}</h1>
        <Link to="/newTodo">Create a todo</Link>
      </aside>
      <div className="container todos__container">
        {
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDeleteTodo={deleteTodo} />
          ))
        }
      </div>
    </section>
  );
};

export default DisplayTodo;
