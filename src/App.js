import React, { useState, useRef } from "react";
import "./App.css";
import ToDoItem from "./components/Toditem";
import ToDoData from "./data/tododata";

const App = () => {
  const [toDo, setToDo] = useState(ToDoData);
  const toDoInput = useRef();
  const errorText = useRef();

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
    let inputValue = toDoInput.current.value;

    if (inputValue !== "") {
      // Only if there's items in the array, add item this way. Prevents bug if all items are removed
      if (toDo.length > 0) {
        // get the last item in array's id, and add 1 to it.
        // This sets new object's id as 1 more than previous id
        let toDoLast = toDo.length - 1;
        let newId = toDo[toDoLast].id + 1;

        let newTask = {
          id: newId,
          task: inputValue,
          completed: false,
        };

        // adding/pushing element to end of array
        setToDo((toDo) => [...toDo, newTask]);

        toDoInput.current.value = "";
        errorText.current.textContent = "";
      }
      // If there are no items in array, add the item this way
      else {
        setToDo((toDo) => [
          ...toDo,
          {
            id: 1,
            task: inputValue,
            completed: false,
          },
        ]);
        toDoInput.current.value = "";
        errorText.current.textContent = "";
      }
    } else {
      errorText.current.textContent = "Please add a task";
    }
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
        <p className="errorText" ref={errorText} />
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
