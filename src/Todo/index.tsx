import React, { Component, FormEvent, createRef } from "react";
import "./todo.scss";
import TodoForm from "./todoForm";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";

export type TodoItemType = {
  id: number;
  text: string;
  isDone: boolean;
};

type Props = {};

export enum FilterType {
  all = "all",
  pending = "pending",
  completed = "completed",
}

type State = {
  todoList: TodoItemType[];
  filterType: FilterType;
};

export default class index extends Component<Props, State> {
  state = {
    todoList: [],
    filterType: FilterType.all,
  };

  inputRef = createRef<HTMLInputElement>();

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.inputRef.current?.value) {
      this.setState(
        ({ todoList }) => {
          return {
            todoList: [
              ...todoList,
              {
                id: new Date().valueOf(),
                text: this.inputRef.current?.value || "",
                isDone: false,
              },
            ],
          };
        },
        () => {
          if (this.inputRef.current?.value) {
            this.inputRef.current.value = "";
          }
        }
      );
    }
  };

  completeTodo = (todoItem: TodoItemType) => {
    this.setState(({ todoList }) => {
      return {
        todoList: todoList.map((x) =>
          x.id === todoItem.id ? { ...x, isDone: !x.isDone } : x
        ),
      };
    });
  };

  deleteTodo = (id: number) => {
    this.setState(({ todoList }) => {
      return {
        todoList: todoList.filter((x) => x.id !== id),
      };
    });
  };

  filterTodo = (filterType: FilterType) => {
    this.setState({ filterType });
  };

  render() {
    console.log("render");
    const { todoList, filterType } = this.state;

    return (
      <div className="container">
        <h1>Todo App</h1>
        <TodoForm onSubmit={this.onSubmit} ref={this.inputRef} />
        <TodoList
          todoList={todoList}
          filterType={filterType}
          completeTodo={this.completeTodo}
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter filterTodo={this.filterTodo} />
      </div>
    );
  }
}
