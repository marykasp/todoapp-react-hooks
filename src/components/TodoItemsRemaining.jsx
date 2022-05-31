import React from "react";

function TodoItemsRemaining({ remaining }) {
  return <span>{remaining()} items remaining</span>;
}

export default TodoItemsRemaining;
