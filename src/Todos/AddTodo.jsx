import React, { useState } from 'react';

const AddTodo = () => {
  const [todo, setTodo] = useState("");

  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button>Add</button>
    </div>
  );
};

export default AddTodo;