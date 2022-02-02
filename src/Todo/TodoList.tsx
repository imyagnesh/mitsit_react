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
  const render = (c: TodoItemType) => (
    <TodoItem
      key={c.id}
      todoItem={c}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );

  return (
    <div className="flex-1">
      {todoList.reduce((p, c) => {
        if (
          filterType == FilterType.all ||
          (filterType === FilterType.pending && !c.isDone) ||
          (filterType == FilterType.completed && c.isDone)
        ) {
          return [...p, render(c)];
        }

        return p;
      }, [])}
    </div>
  );
};

export default TodoList;
