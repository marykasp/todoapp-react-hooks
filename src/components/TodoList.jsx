import React from "react";

function TodoList({
  todos,
  completeTodo,
  markAsEditing,
  updateTodo,
  cancelEdit,
  deleteTodo,
}) {
  return (
    <>
      <ul className="todo-list">
        {/* iterate over the todo state */}
        {todos.map((todo, index) => {
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
              <button
                className="edit-button"
                onClick={() => markAsEditing(todo.id)}
              >
                <i class="bx bxs-edit"></i>
              </button>
              <button className="x-button" onClick={() => deleteTodo(todo.id)}>
                <i class="bx bxs-trash"></i>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="check-all-container">
        <div>
          <div className="button">Check All</div>
        </div>

        <span>3 items remaining</span>
      </div>

      <div className="other-buttons-container">
        <div>
          <button className="button filter-button filter-button-active">
            All
          </button>
          <button className="button filter-button">Active</button>
          <button className="button filter-button">Completed</button>
        </div>

        <div>
          <button className="button">Clear completed</button>
        </div>
      </div>
    </>
  );
}

export default TodoList;
