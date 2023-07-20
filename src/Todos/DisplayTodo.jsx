import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { auth, db } from "../config/firebase";

const DisplayTodo = ({ getTodos, todos, reference }) => {
  // const [todos, setTodos] = useState([]);
  // const todosRfef = "todos";
  // const ref = collection(db, todosRfef);

  // const getTodos = async () => {
  //   try {
  //     const data = await getDocs(ref);
  //     const filteredData = data.docs.map(doc => ({
  //       ...doc.data(),
  //       id: doc.id
  //     }));
  //     setTodos(filteredData);
  //     console.log(todos);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const todoDocRef = doc(reference, id);
      await deleteDoc(todoDocRef);
      getTodos();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(auth?.currentUser?.uid);
    console.log(todos);
  }, []);

  return (
    <div>
      {
        todos.map((todo, index) => (
          <article key={todo.id}>
            {
              todo.userId === auth?.currentUser?.uid && (
                <div key={index}>
                  <h1>{todo.title}</h1>
                  <p>{todo.content}</p>
                  <button onClick={() => deleteTodo(todo.id)}>Delete Todo</button>
                </div>
              )
            }
          </article>
        ))
      }
    </div>
  );
};

export default DisplayTodo;