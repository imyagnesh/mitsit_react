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

type LoadingAppStatus = {
  state: "LOADING";
  error?: never;
};

type ErrorAppStatus = {
  state: "ERROR";
  error: Error;
};

type BaseAppStatus = LoadingAppStatus | ErrorAppStatus;

type WithoutIdType = "LOAD_TODO" | "ADD_TODO";
type WithIdType = "UPDATE_TODO" | "DELETE_TODO";

type StatusType = WithoutIdType | WithIdType;

type WithoutIdTypes = {
  type: WithoutIdType;
  id?: never;
};

type WithIdTypes = {
  type: WithIdType;
  id: number;
};

type BaseTypeStatus = WithoutIdTypes | WithIdTypes;

export type AppStatus = BaseAppStatus & BaseTypeStatus;

type State = {
  todoList: TodoItemType[];
  filterType: FilterType;
  appStatus: AppStatus[];
};

export default class index extends Component<Props, State> {
  state = {
    appStatus: [] as AppStatus[],
    todoList: [] as TodoItemType[],
    filterType: FilterType.all,
  };

  inputRef = createRef<HTMLInputElement>();

  async componentDidMount() {
    this.loadData(FilterType.all);
  }

  setLoadingStatus = (type: StatusType) => {
    this.setState(({ appStatus }) => {
      const newStatus: AppStatus = {
        type,
        state: "LOADING",
      } as WithoutIdTypes & LoadingAppStatus;
      return {
        appStatus: [...appStatus, newStatus],
      };
    });
  };

  setSuccessStatus = (type: StatusType) => {
    this.setState(({ appStatus }) => {
      return {
        appStatus: appStatus.filter((x) => x.type !== type),
      };
    });
  };

  setErrorStatus = (type: StatusType, error: Error) => {
    this.setState(({ appStatus }) => {
      return {
        appStatus: appStatus.map((x) => {
          if (x.type === type) {
            return { ...x, state: "ERROR", error: error as Error };
          }
          return x;
        }),
      };
    });
  };

  loadData = async (filterType: FilterType) => {
    const type: StatusType = "LOAD_TODO";
    try {
      this.setLoadingStatus(type);

      let url = "http://localhost:3000/todoList";
      if (filterType !== FilterType.all) {
        url = `${url}?isDone=${filterType === FilterType.completed}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      this.setState({
        todoList: json,
        filterType,
      });
      this.setSuccessStatus(type);
    } catch (error) {
      this.setErrorStatus(type, error as Error);
    }
  };

  onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const type: StatusType = "ADD_TODO";
    try {
      event.preventDefault();
      if (this.inputRef.current?.value) {
        this.setLoadingStatus(type);
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
        this.setSuccessStatus(type);
      }
    } catch (error) {
      this.setErrorStatus(type, error as Error);
    }
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

  render() {
    const { todoList, filterType, appStatus } = this.state;

    const loadingStatus = appStatus.find((x) => x.type === "LOAD_TODO");

    if (loadingStatus) {
      if (loadingStatus.state === "LOADING") {
        return <h1>Loading...</h1>;
      }
      if (loadingStatus.state === "ERROR") {
        return <h1>{loadingStatus.error.message}</h1>;
      }
    }

    return (
      <div className="container">
        <h1>Todo App</h1>
        <TodoForm
          onSubmit={this.onSubmit}
          ref={this.inputRef}
          status={appStatus.find((x) => x.type === "ADD_TODO")}
        />
        <TodoList
          todoList={todoList}
          filterType={filterType}
          completeTodo={this.completeTodo}
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter filterType={filterType} filterTodo={this.loadData} />
      </div>
    );
  }
}
