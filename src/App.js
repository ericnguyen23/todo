import React, { useState, useRef } from "react";
import "./App.css";
import ToDoItem from "./components/Toditem";
import ToDoData from "./data/tododata";

const App = () => {
  const [toDo, setToDo] = useState(ToDoData);
  const toDoInput = useRef();

  const handleChange = (id) => {
    // looping over array and returning a new version of the array,
    // toggling completed properties value
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

    // get the last item in array's id, and add 1 to it.
    // This sets new object's id as 1 more than previous id
    let toDoLast = toDo.length - 1;
    let newId = toDo[toDoLast].id + 1;

    let inputValue = toDoInput.current.value;

    let newTask = {
      id: newId,
      task: inputValue,
      completed: false,
    };

    // adding/pushing element to end of array
    setToDo((toDo) => [...toDo, newTask]);
  };

  const handleRemoveClick = (id) => {
    // creating new array with the clicked item(id) removed
    const updatedToDo = toDo.filter((item) => item.id !== id);
    setToDo(updatedToDo);
  };

  return (
    <div className="task-container">
      <h1>To DO's</h1>
      <div className="input-container">
        <input type="text" ref={toDoInput} />
        <button onClick={(e) => handleAddClick(e)}>ADD TASK</button>
      </div>
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
    </div>
  );
};

export default App;
