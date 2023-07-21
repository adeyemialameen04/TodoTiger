import { AiFillDelete } from "react-icons/ai";
import { auth } from "../../config/firebase";

const TodoItem = ({ todo, onDeleteTodo }) => {
  const isCurrentUserTodo = todo.userId === auth?.currentUser?.uid;

  return (
    <article>
      {
        isCurrentUserTodo && (
          <div className="todo">
            <div className="top">
              <h1>{todo.title}</h1>
              <button onClick={() => onDeleteTodo(todo.id)}><AiFillDelete /></button>
            </div>
            <p>{todo.content}</p>
          </div>
        )
      }
    </article>
  );
};

export default TodoItem;