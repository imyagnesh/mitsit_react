import React, { ChangeEvent, Component, FormEvent, createRef } from "react";
import "./todo.scss";

type TodoItem = {
  text: string;
};

type Props = {};

type State = {
  todoList: TodoItem[];
};

export default class index extends Component<Props, State> {
  state = {
    todoList: [],
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
              { text: this.inputRef.current?.value || "" },
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

  render() {
    console.log("render");
    const { todoList } = this.state;

    return (
      <div className="container">
        <h1>Todo App</h1>
        <form className="flex justify-center" onSubmit={this.onSubmit}>
          <div className="w-full sm:w-1/2 md:w-1/4">
            <label htmlFor="todo-text" className="hidden">
              First name
            </label>
            <input
              ref={this.inputRef}
              type="text"
              name="todo-text"
              id="todo-text"
              className="text-input"
            />
          </div>
          <button type="submit" className="btn">
            Save
          </button>
        </form>
        <div>
          {todoList.map((todoItem: TodoItem) => (
            <div>
              <p>{todoItem.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
