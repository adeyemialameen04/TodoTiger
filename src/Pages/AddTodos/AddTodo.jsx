import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { auth, db } from "../../config/firebase";
import { Link } from "react-router-dom";
import "./addtodo.css";

const AddTodo = ({ getTodos, onAddTodo }) => {
  const [todo, setTodo] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const addTodo = async () => {
    try {
      if (todo.trim() === "" || content.trim() === "") {
        alert("You cant submit an empty todo");
        return;
      } else if (date.trim() === "") {
        alert("Pls add a deadline 😉🥹");
      }

      const todoRef = collection(db, "todos");
      await addDoc(todoRef, {
        title: todo,
        content: content,
        userId: auth?.currentUser?.uid,
        date: date
      });

      const newTodo = {
        userId: auth?.currentUser?.uid,
        title: todo,
        content: content,
        date: date
      };


      if (onAddTodo) {
        onAddTodo(newTodo);
      }

      alert("Todo created successfully. Go to the todos page to see your saved todos");
      setTodo("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="addTodo__main">
      <div className="container addtodo__container">
        <div>
          <h1>Hi, {auth?.currentUser?.displayName}</h1>
          <p>Create a todo</p>
        </div>
        <input
          type="text"
          value={todo}
          placeholder="Title"
          onChange={(e) => setTodo(e.target.value)}
        />
        <label htmlFor="date">Deadline</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <textarea
          type="text"
          value={content}
          placeholder="Content of todo"
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={addTodo}>Submit</button>
        <Link to="/todos">Todos</Link>
      </div>
    </main>
  );
};

export default AddTodo;