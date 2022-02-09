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

export type FilterType = "all" | "pending" | "completed";

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
    filterType: "all" as FilterType,
  };

  inputRef = createRef<HTMLInputElement>();

  async componentDidMount() {
    this.loadData("all");
  }

  setLoadingStatus = (type: StatusType, id?: number) => {
    this.setState(({ appStatus }) => {
      const newStatus: AppStatus = {
        state: "LOADING",
        type,
        id: id,
      } as BaseTypeStatus & LoadingAppStatus;
      return {
        appStatus: [...appStatus, newStatus],
      };
    });
  };

  setSuccessStatus = (type: StatusType, id?: number) => {
    this.setState(({ appStatus }) => {
      return {
        appStatus: appStatus.filter((x) => !(x.type == type && x.id === id)),
      };
    });
  };

  setErrorStatus = (type: StatusType, error: Error, id?: number) => {
    this.setState(({ appStatus }) => {
      return {
        appStatus: appStatus.map((x) => {
          if (x.type === type && x.id === id) {
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
      if (filterType !== "all") {
        url = `${url}?isDone=${filterType === "completed"}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      this.setState({
        todoList: json,
        filterType,
      });
      this.setSuccessStatus(type, undefined);
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
    const type: StatusType = "UPDATE_TODO";
    try {
      this.setLoadingStatus(type, todoItem.id);
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
      this.setSuccessStatus(type, todoItem.id);
    } catch (error) {
      this.setErrorStatus(type, error as Error, todoItem.id);
    }
  };

  deleteTodo = async (id: number) => {
    const type: StatusType = "DELETE_TODO";
    try {
      this.setLoadingStatus(type, id);
      await fetch(`http://localhost:3000/todoList/${id}`, {
        method: "DELETE",
      });

      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
      this.setSuccessStatus(type, id);
    } catch (error) {
      this.setErrorStatus(type, error as Error, id);
    }
  };

  render() {
    console.log("App rerender");

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
          completeTodo={this.completeTodo}
          deleteTodo={this.deleteTodo}
          status={appStatus.filter(
            (x) => x.type === "UPDATE_TODO" || x.type === "DELETE_TODO"
          )}
        />
        <TodoFilter filterType={filterType} filterTodo={this.loadData} />
      </div>
    );
  }
}
