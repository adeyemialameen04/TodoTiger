import { AiFillDelete } from "react-icons/ai";
import { auth } from "../../config/firebase";
import { useEffect } from "react";

const TodoItem = ({ todo, onDeleteTodo }) => {
  const isCurrentUserTodo = todo.userId === auth?.currentUser?.uid;

  const newDate = new Date(todo.date);
  const year = newDate.getFullYear();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = days[newDate.getDay()];
  const month = months[newDate.getMonth()];

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
            <h1 className="title">{todo.title}</h1>
            <div>{todo.content}</div>
            <div className="bottom">
              <small>Deadline: {day}, {month}, {year}</small>
              <button className="deleteBtn" onClick={() => onDeleteTodo(todo.id)}>
                <AiFillDelete />
              </button>
            </div>
          </>
        )
      }
    </article>
  );
};

export default TodoItem;