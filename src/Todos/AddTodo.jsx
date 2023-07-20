import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { auth, db } from "../config/firebase";

const AddTodo = ({ getTodos, onAddTodo }) => {
  const [todo, setTodo] = useState("");
  const [content, setContent] = useState("");

  const addTodo = async () => {
    try {
      if (todo.trim() === "" || content.trim() === "") {
        return;
      }

      const todoRef = collection(db, "todos");
      await addDoc(todoRef, {
        title: todo,
        content: content,
        userId: auth?.currentUser?.uid
      });

      const newTodo = {
        userId: auth?.currentUser?.uid,
        title: todo,
        content: content
      };


      if (onAddTodo) {
        onAddTodo(newTodo);
      }

      setTodo("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
};

export default AddTodo;