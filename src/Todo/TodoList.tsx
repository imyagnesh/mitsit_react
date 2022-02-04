import React from "react";
import { FilterType, TodoItemType } from ".";
import TodoItem from "./TodoItem";

type Props = {
  todoList: TodoItemType[];
  filterType: FilterType;
  completeTodo: (todoItem: TodoItemType) => void;
  deleteTodo: (id: number) => void;
};

const TodoList = ({
  todoList,
  filterType,
  completeTodo,
  deleteTodo,
}: Props) => {
  return (
    <div className="flex-1">
      {todoList.map((item) => {
        return (
          <TodoItem
            key={item.id}
            todoItem={item}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
