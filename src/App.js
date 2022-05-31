import { useState } from "react";
import "./App.css";

function App() {
  // set state - array destructing
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish React Series",
      isComplete: false,
    },
    {
      id: 2,
      title: "FFXIV MSQ",
      isComplete: false,
    },
    {
      id: 3,
      title: "Skillcrush Lesson 8",
      isComplete: false,
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
                  <input type="checkbox" />
                  <span className="todo-item-label">{todo.title}</span>
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
