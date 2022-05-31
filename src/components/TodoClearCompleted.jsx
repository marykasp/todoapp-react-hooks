import React from "react";

function TodoClearCompleted({ clearCompleted }) {
  return (
    <button onClick={clearCompleted} className="button clear-btn">
      Clear completed
    </button>
  );
}

export default TodoClearCompleted;
