import { useState } from "react";
import "./App.css";

function App() {
  // set state - array destructing
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish React Series",
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: "FFXIV MSQ",
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: "Skillcrush Lesson 8",
      isComplete: false,
      isEditing: false,
    },
  ]);
  const [todoInput, setTodoInput] = useState("");
  const [idForTodo, setIdForTodo] = useState(4);

  // Event Handler Functions
  function addTodo(event) {
    event.preventDefault();
    // check if input is empty
    if (todoInput.trim().length === 0) {
      return;
    }
    // grab what user enters by getting the todoInput
    // update todos array
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ]);

    setTodoInput("");
    // need to use a callback if updating a previous state
    setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);
  }

  function handleInput(event) {
    // update the todoInput state with what user types in
    setTodoInput(event.target.value);
  }

  function deleteTodo(id) {
    // get the id of the todo
    console.log(`deleting todo id ${id}`);
    // set the todos by removing the todos clicked on
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function completeTodo(id) {
    // iterate over the todos and change the isComplete property for todo clicked on
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const updatedTodos = todos.map((todo) => {
      // change the isEditing property of todo clicked on
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(e, id) {
    console.log(e.target.value);
    // update the todo from the value in the input field - iterate over the todos and change the title and isEditing property of the todo being edited
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        // check if input value is empty string
        if (e.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = e.target.value;
        // change isEditing to false to display the span again
        todo.isEditing = false;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEdit(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
            value={todoInput}
            onChange={handleInput}
          />
        </form>

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
                  className="x-button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <svg
                    className="x-button-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
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
      </div>
    </div>
  );
}

export default App;
