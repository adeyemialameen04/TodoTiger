import "./todo.css";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import DisplayTodo from "./DisplayTodo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const todosRfef = "todos";
  const ref = collection(db, todosRfef);

  const getTodos = async () => {
    try {
      const data = await getDocs(ref);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(filteredData);
    } catch (error) {
      return <h1>Error: {error}</h1>;
    }
  };

  const handleAddToTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  // =================================
  const handleNotificationPermission = async () => {
    try {
      const permissionResult = await Notification.requestPermission();
      if (permissionResult === "granted") {
        console.log("Notification permission granted");
        // Start checking deadlines and sending notifications
        startDeadlineChecking();
      } else {
        console.log("Notification permission denied");
        // Handle case when the user denies permission
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const startDeadlineChecking = () => {
    // Check deadlines periodically (every minute in this example)
    const interval = setInterval(checkDeadlines, 60000);
    return () => clearInterval(interval);
  };

  const checkDeadlines = () => {
    // Get stored todos from local storage or indexedDB
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    // Get the current time
    const currentTime = new Date().getTime();

    // Loop through todos to check deadlines
    storedTodos.forEach((todo) => {
      const deadlineTime = new Date(todo.date).getTime();
      if (deadlineTime <= currentTime && !todo.notified) {
        // If deadline has passed and not yet notified, send notification
        sendNotification(todo.title, todo.content);

        // Set 'notified' flag to true to prevent duplicate notifications
        todo.notified = true;
      }
    });

    // Save updated todos back to local storage or indexedDB
    localStorage.setItem("todos", JSON.stringify(storedTodos));
  };

  const sendNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };
  // ===================================

  return (
    <div>
      <>
        {Notification.permission !== "granted" && (
          <button onClick={handleNotificationPermission}>
            Enable Notifications
          </button>
        )}
      </>
      <DisplayTodo getTodos={getTodos} todos={todos} reference={ref} />
    </div>
  );
};

export default Todos;
