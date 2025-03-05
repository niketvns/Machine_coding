import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/features/todo/todoSlice";

const AddTodos = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name=""
        id=""
        placeholder="Add a todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodos;
