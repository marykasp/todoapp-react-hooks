import React from "react";

function TodoCompleteAll(props) {
  return (
    <div>
      <div onClick={props.completeAllTodos} className="button check-all">
        Check All
      </div>
    </div>
  );
}

export default TodoCompleteAll;
