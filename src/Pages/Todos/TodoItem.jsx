import { AiFillDelete } from "react-icons/ai";
import { auth } from "../../config/firebase";

const TodoItem = ({ todo, onDeleteTodo }) => {
  const currentUserId = auth?.currentUser?.uid;

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
    <>
      {
        currentUserId === todo.userId && (
          <article className="todo">
            <h1 className="title">{todo.title}</h1>
            <p>{todo.content}</p>
            <div className="bottom">
              <small>Deadline: {day}, {month}, {year}</small>
              <button className="deleteBtn" onClick={() => onDeleteTodo(todo.id)}>
                <AiFillDelete />
              </button>
            </div>
          </article>
        )
      }
    </>
  );
};

export default TodoItem;