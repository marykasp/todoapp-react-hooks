import React, { useContext } from "react";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoClearCompleted from "./TodoClearCompleted";
import TodoCompleteAll from "./TodoCompleteAll";
import TodoFilters from "./TodoFilters";
import useToggle from "../hooks/useToggle";
import { TodosContext } from "../context/TodosContext";
import { CSSTransition } from "react-transition-group";
import { TransitionGroup } from "react-transition-group";

function TodoList() {
  const [isFeatureOneVisible, setFeatureOneVisible] = useToggle();
  const [isFeatureTwoVisible, setFeatureTwoVisible] = useToggle();
  // instead of passing down props getting the props from the Global Context
  const { todosFiltered, todos, setTodos } = useContext(TodosContext);

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

  // map over the filtered todos, depending on the filter state and create a list item for each todo. todosFiltered function returns a todo list based on isComplete property of todo */
  const todoItems = todosFiltered().map((todo) => {
    return (
      <CSSTransition key={todo.id} timeout={300} classNames="slide-horizontal">
        <li className="todo-item-container">
          <div className="todo-item">
            <input
              type="checkbox"
              onChange={() => completeTodo(todo.id)}
              checked={todo.isComplete}
              className="todo-checkbox"
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
            <i className="bx bxs-edit"></i>
          </button>
          <button className="x-button" onClick={() => deleteTodo(todo.id)}>
            <i className="bx bxs-trash"></i>
          </button>
        </li>
      </CSSTransition>
    );
  });

  return (
    <>
      {/* insert todo items in the todolist */}
      <TransitionGroup component="ul" className="todo-list">
        {todoItems}
      </TransitionGroup>

      <div className="toggle-container">
        <button className="button" onClick={setFeatureOneVisible}>
          Remaining Todos
        </button>
        <button className="button" onClick={setFeatureTwoVisible}>
          Filter Todos
        </button>
      </div>

      {/* toggle these features based on a state value */}
      <CSSTransition
        in={isFeatureOneVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="check-all-container">
          <TodoCompleteAll />

          <TodoItemsRemaining />
        </div>
      </CSSTransition>

      <CSSTransition
        in={isFeatureTwoVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="filter-buttons-container">
          <TodoFilters />

          <div>
            <TodoClearCompleted />
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default TodoList;
