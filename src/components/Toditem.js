import React from "react";

const ToDoItem = (props) => {
  return (
    <div className="todo-list">
      <div className="todo-item">
        <input
          type="checkbox"
          checked={props.checked}
          onChange={props.handleChange}
          className="input"
        />
        {props.checked ? (
          <p className="completed">{props.task}</p>
        ) : (
          <p>{props.task}</p>
        )}
        <button onClick={props.handleClick}>Remove</button>
      </div>
    </div>
  );
};

export default ToDoItem;
