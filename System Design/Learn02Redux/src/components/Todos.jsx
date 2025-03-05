import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, markAsCompleted } from "../store/features/todo/todoSlice";

const Todos = () => {
  const todos = useSelector((store) => store.todos);
  const dispatch = useDispatch();

  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            textDecoration: todo.isCompleted ? "line-through" : "auto",
          }}
        >
          <input
            type="checkbox"
            name=""
            id=""
            onChange={() => dispatch(markAsCompleted(todo.id))}
          />
          {"  "}
          {todo.text}
          {"  "}
          <button onClick={() => dispatch(removeTodo(todo.id))}>X</button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
