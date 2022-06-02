import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoClearCompleted() {
  const { todos, setTodos } = useContext(TodosContext);

  function clearCompleted() {
    // filter todos that are not complete, keep them in todos array
    setTodos([...todos].filter((todo) => !todo.isComplete));
  }

  return (
    <button onClick={clearCompleted} className="button clear-btn">
      Clear completed
    </button>
  );
}

export default TodoClearCompleted;
