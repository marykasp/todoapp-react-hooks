import React, { useState } from "react";

function NameInput({ nameInputEl }) {
  const [name, setName] = useState("");
  return (
    <div className="name-container">
      <h4>What is your name?</h4>

      <form action="#">
        <input
          type="text"
          ref={nameInputEl}
          className="todo-input-name"
          placeholder="Enter your name.."
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </form>
      {name && (
        <p className="name-label">
          Hello, <span>{name}</span>
        </p>
      )}

      <i className="bx bx-list-ul"></i>
    </div>
  );
}

export default NameInput;
