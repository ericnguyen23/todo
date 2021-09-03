import React, { useState, useRef } from "react";
import "./App.css";
import ToDoItem from "./components/Toditem";
import ToDoData from "./data/tododata";

const App = () => {
  const [toDo, setToDo] = useState(ToDoData);
  const toDoInput = useRef();

  const handleChange = (id) => {
    const updatedToDo = toDo.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });

    setToDo(updatedToDo);
  };

  const handleAddClick = (e) => {
    e.preventDefault();

    let inputValue = toDoInput.current.value;
    let toDoLength = toDo.length + 1;

    let newTask = {
      id: toDoLength,
      task: inputValue,
      completed: false,
    };

    setToDo((toDo) => [...toDo, newTask]);
  };

  const handleRemoveClick = (id) => {
    const updatedToDo = toDo.filter((item) => item.id !== id);

    setToDo(updatedToDo);
  };

  return (
    <div className="task-container">
      <h1>To DO's</h1>
      <div className="to-do-container">
        {toDo.map((item) => (
          <ToDoItem
            task={item.task}
            checked={item.completed}
            key={item.id}
            handleChange={() => handleChange(item.id)}
            handleClick={() => handleRemoveClick(item.id)}
          />
        ))}
      </div>
      <div className="input-container">
        <input type="text" ref={toDoInput} />
        <button onClick={(e) => handleAddClick(e)}>ADD TASK</button>
      </div>
    </div>
  );
};

export default App;
