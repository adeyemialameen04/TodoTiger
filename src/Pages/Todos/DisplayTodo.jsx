import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { auth, db } from "../../config/firebase";
import { Link } from "react-router-dom";
import TodoItem from "./TodoItem";

const DisplayTodo = ({ getTodos, todos, reference }) => {

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const todoDocRef = doc(reference, id);
      await deleteDoc(todoDocRef);
      alert("Todo deleted successfully")
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
            <div key={todo.id} >
              <TodoItem todo={todo} onDeleteTodo={deleteTodo} />
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default DisplayTodo;