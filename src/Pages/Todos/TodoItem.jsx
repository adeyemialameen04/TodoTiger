import { AiFillDelete } from "react-icons/ai";
import { auth } from "../../config/firebase";

const TodoItem = ({ todo, onDeleteTodo }) => {
  const isCurrentUserTodo = todo.userId === auth?.currentUser?.uid;


  return (
    <article
      key={todo.id}
      style={{
        display: isCurrentUserTodo ? "flex" : "none"
      }}
      className="todo">
      {
        auth.currentUser.uid === todo.userId && (
          <>
            <div className="top">
              <h1>{todo.title}</h1>
              <button onClick={() => onDeleteTodo(todo.id)}><AiFillDelete /></button>
            </div>
            <div>{todo.content}</div>
          </>
        )
      }

    </article>
  );
};

export default TodoItem;