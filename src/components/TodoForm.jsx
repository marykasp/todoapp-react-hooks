import React, { useContext, useState } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoForm() {
  const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext);
  const [todoInput, setTodoInput] = useState("");

  function handleInput(event) {
    // update the todoInput state with what user types in
    setTodoInput(event.target.value);
  }

  function addTodo(e) {
    e.preventDefault();
    // check if input is empty
    if (todoInput.trim().length === 0) {
      return;
    }

    // update todos array using context
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ]);
    // need to use a callback if updating a previous state, from context
    setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);
    setTodoInput("");
  }

  return (
    <form action="#" onSubmit={addTodo}>
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
