import React, { useEffect, useRef, useState } from "react";
import NoTodos from "./components/NoTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import NameInput from "./components/NameInput";
import "./App.css";
import { TodosContext } from "./context/TodosContext";
import { CSSTransition } from "react-transition-group";
import { SwitchTransition } from "react-transition-group";

function App() {
  // set state - array destructing
  const nameInputEl = useRef(null);
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [idForTodo, setIdForTodo] = useState(
    JSON.parse(localStorage.getItem("idForTodo")) || 1
  );

  // Event Handler Functions

  // returns a new array of todos that is then mapped over in TodoList Component
  function todosFiltered() {
    if (filter === "active") {
      // returns a new array of todos not yet done
      return todos.filter((todo) => !todo.isComplete);
    } else if (filter === "completed") {
      // returns a new array of todos completed
      return todos.filter((todo) => todo.isComplete);
    }

    return todos;
  }

  // listens for component mounting, or state change if dependencies are passed in the array and will execute the callback function
  useEffect(() => {
    // will focus the input when the component mounts
    nameInputEl.current.focus();
    // when component unmounts
    return function cleanup() {
      // console.log("cleaning up");
    };
  }, []);

  // when component mounts or todos updates the todos will be set in local storage
  useEffect(() => {
    // setItems in local storage
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("idForTodo", JSON.stringify(idForTodo));
  }, [todos, idForTodo]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        setIdForTodo,
        idForTodo,
        filter,
        setFilter,
        todosFiltered,
      }}
    >
      <div className="todo-app-container">
        <div className="todo-app">
          <NameInput nameInputEl={nameInputEl} />
          <h2>Todo App</h2>
          <TodoForm />

          {/* show the todolist or notodos if there are no todos in the todos array */}
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={todos.length > 0}
              timeout={300}
              classNames="slide-vertical"
              unmountOnExit
            >
              {todos.length > 0 ? <TodoList /> : <NoTodos />}
            </CSSTransition>
          </SwitchTransition>
          {/* <CSSTransition
            in={todos.length > 0}
            timeout={300}
            clasNames="slide-vertical"
            unmountOnExit
          >
            <TodoList />
          </CSSTransition>

          <CSSTransition
            in={todos.length === 0}
            timeout={300}
            clasNames="slide-vertical"
            unmountOnExit
          >
            <NoTodos />
          </CSSTransition> */}
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
