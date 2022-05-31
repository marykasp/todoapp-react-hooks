import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [todoInput, setTodoInput] = useState("");

  function handleInput(event) {
    // update the todoInput state with what user types in
    setTodoInput(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // check if input is empty
    if (todoInput.trim().length === 0) {
      return;
    }

    // call prop function passed down to edit the todos in the App Component
    addTodo(todoInput);
    setTodoInput("");
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        value={todoInput}
        onChange={handleInput}
      />
    </form>
  );
}

export default TodoForm;
