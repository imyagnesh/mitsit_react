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
  testRef: HTMLInputElement = {} as HTMLInputElement;

  testRef2: HTMLInputElement = {} as HTMLInputElement;

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

  ref1 = (ele: HTMLInputElement) => {
    this.testRef = ele;
  };

  ref2 = (ele: HTMLInputElement) => {
    this.testRef2 = ele;
  };

  render() {
    console.log("render");
    const { todoList, filterType } = this.state;

    return (
      <div className="container">
        <h1>Todo App</h1>
        <button
          onClick={() => {
            console.log(this.testRef.value);
          }}
        >
          Test
        </button>

        <button
          onClick={() => {
            console.log(this.testRef2.value);
          }}
        >
          Test1
        </button>
        <TodoForm
          onSubmit={this.onSubmit}
          ref1={this.ref1}
          ref2={this.ref2}
          ref={(ele) => this.inputRef}
        />
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
