import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoItemsRemaining() {
  const { todos } = useContext(TodosContext);
  function remaining() {
    // filter the todos that are not complete -isComplete is false, get the length of that new list to display
    return todos.filter((todo) => !todo.isComplete).length;
  }

  return <span>{remaining()} items remaining</span>;
}

export default TodoItemsRemaining;
