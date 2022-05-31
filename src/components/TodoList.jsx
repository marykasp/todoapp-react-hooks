import React, { useState } from "react";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoClearCompleted from "./TodoClearCompleted";
import TodoCompleteAll from "./TodoCompleteAll";
import TodoFilters from "./TodoFilters";

function TodoList({
  todos,
  completeTodo,
  markAsEditing,
  updateTodo,
  cancelEdit,
  deleteTodo,
  remaining,
  clearCompleted,
  completeAllTodos,
  todosFiltered,
}) {
  // set state, filter
  const [filter, setFilter] = useState("all");
  // iterate over the filtered todos, depending on the filter state and create a list item for each todo. todosFiltered function returns a todo list based on isComplete property of todo */
  const todoItems = todosFiltered(filter).map((todo) => {
    return (
      <li className="todo-item-container" key={todo.id}>
        <div className="todo-item">
          <input
            type="checkbox"
            onChange={() => completeTodo(todo.id)}
            checked={todo.isComplete}
          />
          {/* conditional rendering of elements using ternary operator */}
          {!todo.isEditing ? (
            <span
              onDoubleClick={() => markAsEditing(todo.id)}
              className={`todo-item-label ${
                todo.isComplete ? "line-through" : ""
              }`}
            >
              {todo.title}
            </span>
          ) : (
            <input
              type="text"
              className="todo-item-input"
              defaultValue={todo.title}
              autoFocus
              onBlur={(e) => updateTodo(e, todo.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateTodo(e, todo.id);
                } else if (e.key === "Escape") {
                  cancelEdit(todo.id);
                }
              }}
            />
          )}
        </div>
        <button className="edit-button" onClick={() => markAsEditing(todo.id)}>
          <i className="bx bxs-edit"></i>
        </button>
        <button className="x-button" onClick={() => deleteTodo(todo.id)}>
          <i className="bx bxs-trash"></i>
        </button>
      </li>
    );
  });

  return (
    <>
      <ul className="todo-list">{todoItems}</ul>

      <div className="check-all-container">
        <TodoCompleteAll completeAllTodos={completeAllTodos} />

        <TodoItemsRemaining remaining={remaining} />
      </div>

      <div className="other-buttons-container">
        <TodoFilters filter={filter} setFilter={setFilter} />

        <div>
          <TodoClearCompleted clearCompleted={clearCompleted} />
        </div>
      </div>
    </>
  );
}

export default TodoList;