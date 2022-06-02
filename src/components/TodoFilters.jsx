import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

// use setfilter in order to display the correct todos depending on which ones are completed or not, use filter to show which button needs the active className
function TodoFilters() {
  const { filter, setFilter } = useContext(TodosContext);
  return (
    <div>
      <button
        onClick={() => {
          setFilter("all");
        }}
        className={`button filter-button ${
          filter === "all" ? "filter-button-active" : ""
        }`}
      >
        All
      </button>
      <button
        onClick={() => {
          setFilter("active");
        }}
        className={`button filter-button ${
          filter === "active" ? "filter-button-active" : ""
        }`}
      >
        Active
      </button>
      <button
        onClick={() => {
          setFilter("completed");
        }}
        className={`button filter-button ${
          filter === "completed" ? "filter-button-active" : ""
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;
