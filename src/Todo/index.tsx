import React, {
  Component,
  FormEvent,
  createRef,
  HtmlHTMLAttributes,
} from "react";
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

  async componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const res = await fetch("http://localhost:3000/todoList");
      const json = await res.json();
      this.setState({
        todoList: json,
      });
    } catch (error) {}
  };

  onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (this.inputRef.current?.value) {
        const res = await fetch("http://localhost:3000/todoList", {
          method: "POST",
          body: JSON.stringify({
            text: this.inputRef.current?.value || "",
            isDone: false,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const json = await res.json();

        // this.loadData();

        this.setState(
          ({ todoList }) => {
            return {
              todoList: [...todoList, json],
            };
          },
          () => {
            if (this.inputRef.current?.value) {
              this.inputRef.current.value = "";
            }
          }
        );
      }
    } catch (error) {}
  };

  completeTodo = async (todoItem: TodoItemType) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${todoItem.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...todoItem, isDone: !todoItem.isDone }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const json = await res.json();

      this.setState(({ todoList }) => {
        // O(logN)
        const index = todoList.findIndex((x) => x.id === todoItem.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {}
  };

  deleteTodo = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/todoList/${id}`, {
        method: "DELETE",
      });

      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
    } catch (error) {}
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
