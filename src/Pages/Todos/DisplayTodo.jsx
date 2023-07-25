import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { auth } from "../../config/firebase";
import { Link } from "react-router-dom";
import TodoItem from "./TodoItem";

const DisplayTodo = ({ getTodos, todos, reference }) => {
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSearchedTodos = () => {
    if (searchQuery === "") {
      return todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDeleteTodo={deleteTodo} />
      ));
    }

    if (filteredTodos.length > 0) {
      return filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDeleteTodo={deleteTodo} />
      ));
    }

    if (filteredTodos.length <= 0) {
      return <p>No matching todos found</p>;
    }
  };

  return (
    <section className="todos__section">
      <aside className="container">
        <h1>Hi, {auth?.currentUser?.displayName}</h1>
        <Link to="/newTodo">Create a todo</Link>
        <input
          type="text"
          name="todoInput"
          id="todoInput"
          placeholder="Search for todos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </aside>
      <div className="container todos__container">
        {getSearchedTodos()}
      </div>
    </section>
  );
};

export default DisplayTodo;
