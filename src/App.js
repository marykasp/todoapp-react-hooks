import { useState } from "react";
import NoTodos from "./components/NoTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  // set state - array destructing
  const [todos, setTodos] = useState([]);
  const [idForTodo, setIdForTodo] = useState(4);

  // Event Handler Functions
  function addTodo(todo) {
    // grab what user enters by getting the todoInput
    // update todos array
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isComplete: false,
      },
    ]);
    // need to use a callback if updating a previous state
    setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);
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

  function remaining() {
    // filter the todos that are not complete -isComplete is false, get the length of that new list to display
    return todos.filter((todo) => !todo.isComplete).length;
  }

  function clearCompleted() {
    // filter todos that are not complete, keep them in todos array
    setTodos([...todos].filter((todo) => !todo.isComplete));
  }

  function completeAllTodos() {
    const updatedTodos = todos.map((todo) => {
      todo.isComplete = true;
      return todo;
    });

    setTodos(updatedTodos);
  }

  function todosFiltered(filter) {
    if (filter === "active") {
      // returns a new array of todos not yet done
      return todos.filter((todo) => !todo.isComplete);
    } else if (filter === "completed") {
      // returns a new array of todos completed
      return todos.filter((todo) => todo.isComplete);
    }

    return todos;
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />

        {/* show the todolist or notodos if there are no todos in the todos array */}
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            cancelEdit={cancelEdit}
            deleteTodo={deleteTodo}
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
