import React, { useEffect, useState } from "react";

function NameInput({ nameInputEl }) {
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("name")) || ""
  );

  function handleSubmit(e) {
    e.preventDefault();
    // change the name state value to be the value from the input
    setName(nameInputEl.current.value);
    // remove the value from the input to be set to an empty string
    nameInputEl.current.value = "";
  }

  // set name value in local stroage when it updates
  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));
  }, [name]);

  return (
    <div className="name-container">
      <form action="#" onSubmit={handleSubmit}>
        {name && (
          <h3 className="name-label">
            Hello, <span>{name}</span>
          </h3>
        )}
        <input
          type="text"
          ref={nameInputEl}
          className="todo-input-name"
          placeholder="What is your name?"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </form>

      <i className="bx bx-list-ul"></i>
    </div>
  );
}

export default NameInput;
