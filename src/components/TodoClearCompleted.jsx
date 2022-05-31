import React from "react";

function TodoClearCompleted({ clearCompleted }) {
  return (
    <button onClick={clearCompleted} className="button">
      Clear completed
    </button>
  );
}

export default TodoClearCompleted;
