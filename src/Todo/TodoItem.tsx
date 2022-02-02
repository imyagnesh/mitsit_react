import React, { memo } from "react";
import { TodoItemType } from ".";

type Props = {
  todoItem: TodoItemType;
  completeTodo: (todoItem: TodoItemType) => void;
  deleteTodo: (id: number) => void;
};

const TodoItem = ({ todoItem, completeTodo, deleteTodo }: Props) => {
  console.log("Todo Item render");

  return (
    <div key={todoItem.id} className="flex items-center m-2">
      <input
        type="checkbox"
        checked={todoItem.isDone}
        onChange={() => completeTodo(todoItem)}
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
      />
      <p className={`flex-1 px-4${todoItem.isDone ? " line-through" : ""}`}>
        {todoItem.text}
      </p>
      <button className="btn" onClick={() => deleteTodo(todoItem.id)}>
        Delete
      </button>
    </div>
  );
};

export default memo(TodoItem);
