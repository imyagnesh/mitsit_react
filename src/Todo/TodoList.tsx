import React from "react";
import { TodoItemType } from ".";
import { AppStatus } from "../types/common";
import TodoItem from "./TodoItem";

type Props = {
  todoList: TodoItemType[];
  completeTodo: (todoItem: TodoItemType) => void;
  deleteTodo: (todoItem: TodoItemType) => void;
  status: AppStatus[];
};

const TodoList = ({ todoList, completeTodo, deleteTodo, status }: Props) => {
  // console.log("TodoList render");

  return (
    <div className="flex-1">
      {todoList.map((item) => {
        return (
          <TodoItem
            key={item.id}
            todoItem={item}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            status={status.find((x) => x.id === item.id)}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
