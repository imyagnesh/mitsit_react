import React, { memo } from "react";
import cn from "classnames";
import { TodoItemType } from ".";
import { AppStatus } from "../types/common";

type Props = {
  todoItem: TodoItemType;
  completeTodo: (todoItem: TodoItemType) => void;
  deleteTodo: (todoItem: TodoItemType) => void;
  status?: AppStatus;
};

const TodoItem = ({ todoItem, completeTodo, deleteTodo, status }: Props) => {
  // console.log("Todo Item render");

  return (
    <div
      data-testid="todo_item_container"
      key={todoItem.id}
      className="flex items-center m-2"
    >
      <input
        type="checkbox"
        disabled={status?.type === "UPDATE_TODO" && status.state === "LOADING"}
        checked={todoItem.isDone}
        onChange={() => {
          completeTodo(todoItem);
        }}
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:text-gray-600 disabled:ring-gray-500"
      />
      <p
        className={cn("flex-1 px-4", {
          "line-through": todoItem.isDone,
        })}
      >
        {todoItem.text}
      </p>
      <button
        disabled={status?.type === "DELETE_TODO" && status.state === "LOADING"}
        className="btn disabled:bg-slate-400"
        onClick={() => deleteTodo(todoItem)}
      >
        Delete
      </button>
    </div>
  );
};

export default memo(TodoItem);
