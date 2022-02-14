import React, {
  FormEvent,
  memo,
  useRef,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import "./todo.scss";
import TodoForm from "./todoForm";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import todoReducer, { TodoInitValues } from "../reducers/todoReducer";
import { FilterType } from "../types/todo";

export type TodoItemType = {
  id: number;
  text: string;
  isDone: boolean;
};

type Props = {};

const Todo: React.FC = () => {
  const [{ appStatus, filterType, todoList }, dispatch] = useReducer(
    todoReducer,
    TodoInitValues
  );

  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const loadData = useCallback(async (ft: FilterType) => {
    const type = "LOAD_TODO";
    try {
      dispatch({
        type: "LOAD_TODO_REQUEST",
        appStatus: { type, state: "LOADING" },
      });

      let url = "http://localhost:3000/todoList";
      if (ft !== "all") {
        url = `${url}?isDone=${ft === "completed"}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      dispatch({
        type: "LOAD_TODO_SUCCESS",
        appStatus: { type, state: "SUCCESS" },
        filterType: ft,
        todoList: json,
      });
    } catch (error) {
      dispatch({
        type: "LOAD_TODO_FAIL",
        appStatus: {
          state: "ERROR",
          type,
          error: error as Error,
        },
      });
    }
  }, []);

  const completeTodo = useCallback(async (todoItem: TodoItemType) => {
    const type = "UPDATE_TODO";
    try {
      dispatch({
        type: "UPDATE_TODO_REQUEST",
        appStatus: {
          type,
          id: todoItem.id,
          state: "LOADING",
        },
      });
      const res = await fetch(`http://localhost:3000/todoList/${todoItem.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...todoItem, isDone: !todoItem.isDone }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      dispatch({
        type: "UPDATE_TODO_SUCCESS",
        appStatus: {
          state: "SUCCESS",
          type,
          id: todoItem.id,
        },
        todoItem: json,
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_TODO_FAIL",
        appStatus: {
          state: "ERROR",
          type,
          id: todoItem.id,
          error: error as Error,
        },
      });
    }
  }, []);

  const deleteTodo = useCallback(async (todoItem: TodoItemType) => {
    const type = "DELETE_TODO";
    try {
      dispatch({
        type: "DELETE_TODO_REQUEST",
        appStatus: {
          type,
          id: todoItem.id,
          state: "LOADING",
        },
      });
      await fetch(`http://localhost:3000/todoList/${todoItem.id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "DELETE_TODO_SUCCESS",
        appStatus: {
          state: "SUCCESS",
          type: "DELETE_TODO",
          id: todoItem.id,
        },
        todoItem,
      });
    } catch (error) {
      dispatch({
        type: "DELETE_TODO_FAIL",
        appStatus: {
          state: "ERROR",
          type,
          id: todoItem.id,
          error: error as Error,
        },
      });
    }
  }, []);

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    const type = "ADD_TODO";
    try {
      event.preventDefault();
      const text = inputRef.current?.value;
      if (text) {
        dispatch({
          type: "ADD_TODO_REQUEST",
          appStatus: {
            type,
            state: "LOADING",
          },
        });
        const res = await fetch("http://localhost:3000/todoList", {
          method: "POST",
          body: JSON.stringify({
            text: text,
            isDone: false,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const json = await res.json();
        dispatch({
          type: "ADD_TODO_SUCCESS",
          todoItem: json,
          appStatus: {
            type,
            state: "SUCCESS",
          },
        });
        inputRef.current.value = "";
      }
    } catch (error) {
      dispatch({
        type: "ADD_TODO_FAIL",
        appStatus: {
          state: "ERROR",
          type,
          error: error as Error,
        },
      });
    }
  }, []);

  useEffect(() => {
    loadData("all");
  }, []);

  console.log("todo component");

  return (
    <div className="container">
      <h1>Todo App</h1>
      <TodoForm
        onSubmit={onSubmit}
        ref={inputRef}
        status={appStatus.find((x) => x.type === "ADD_TODO")}
      />
      <TodoList
        todoList={todoList}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
        status={appStatus.filter(
          (x) => x.type === "UPDATE_TODO" || x.type === "DELETE_TODO"
        )}
      />
      <TodoFilter filterType={filterType} filterTodo={loadData} />
    </div>
  );
};

export default memo(Todo);

// export default class index extends Component<Props, State> {
//   state = {
//     appStatus: [] as AppStatus[],
//     todoList: [] as TodoItemType[],
//     filterType: "all" as FilterType,
//   };

//   inputRef = createRef<HTMLInputElement>();

//   async componentDidMount() {
//     this.loadData("all");
//   }

//   setLoadingStatus = (type: StatusType, id?: number) => {
//     this.setState(({ appStatus }) => {
//       const newStatus: AppStatus = {
//         state: "LOADING",
//         type,
//         id: id,
//       } as BaseTypeStatus & LoadingAppStatus;
//       return {
//         appStatus: [...appStatus, newStatus],
//       };
//     });
//   };

//   setSuccessStatus = (type: StatusType, id?: number) => {
//     this.setState(({ appStatus }) => {
//       return {
//         appStatus: appStatus.filter((x) => !(x.type == type && x.id === id)),
//       };
//     });
//   };

//   setErrorStatus = (type: StatusType, error: Error, id?: number) => {
//     this.setState(({ appStatus }) => {
//       return {
//         appStatus: appStatus.map((x) => {
//           if (x.type === type && x.id === id) {
//             return { ...x, state: "ERROR", error: error as Error };
//           }
//           return x;
//         }),
//       };
//     });
//   };

//   loadData = async (filterType: FilterType) => {
//     const type: StatusType = "LOAD_TODO";
//     try {
//       this.setLoadingStatus(type);

//       let url = "http://localhost:3000/todoList";
//       if (filterType !== "all") {
//         url = `${url}?isDone=${filterType === "completed"}`;
//       }

//       const res = await fetch(url);
//       const json = await res.json();
//       this.setState({
//         todoList: json,
//         filterType,
//       });
//       this.setSuccessStatus(type, undefined);
//     } catch (error) {
//       this.setErrorStatus(type, error as Error);
//     }
//   };

//   onSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     const type: StatusType = "ADD_TODO";
//     try {
//       event.preventDefault();
//       if (this.inputRef.current?.value) {
//         this.setLoadingStatus(type);
//         const res = await fetch("http://localhost:3000/todoList", {
//           method: "POST",
//           body: JSON.stringify({
//             text: this.inputRef.current?.value || "",
//             isDone: false,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         });

//         const json = await res.json();

//         // this.loadData();

//         this.setState(
//           ({ todoList }) => {
//             return {
//               todoList: [...todoList, json],
//             };
//           },
//           () => {
//             if (this.inputRef.current?.value) {
//               this.inputRef.current.value = "";
//             }
//           }
//         );
//         this.setSuccessStatus(type);
//       }
//     } catch (error) {
//       this.setErrorStatus(type, error as Error);
//     }
//   };

//   completeTodo = async (todoItem: TodoItemType) => {
//     const type: StatusType = "UPDATE_TODO";
//     try {
//       this.setLoadingStatus(type, todoItem.id);
//       const res = await fetch(`http://localhost:3000/todoList/${todoItem.id}`, {
//         method: "PUT",
//         body: JSON.stringify({ ...todoItem, isDone: !todoItem.isDone }),
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });

//       const json = await res.json();

//       this.setState(({ todoList }) => {
//         // O(logN)
//         const index = todoList.findIndex((x) => x.id === todoItem.id);
//         return {
//           todoList: [
//             ...todoList.slice(0, index),
//             json,
//             ...todoList.slice(index + 1),
//           ],
//         };
//       });
//       this.setSuccessStatus(type, todoItem.id);
//     } catch (error) {
//       this.setErrorStatus(type, error as Error, todoItem.id);
//     }
//   };

//   deleteTodo = async (id: number) => {
//     const type: StatusType = "DELETE_TODO";
//     try {
//       this.setLoadingStatus(type, id);
//       await fetch(`http://localhost:3000/todoList/${id}`, {
//         method: "DELETE",
//       });

//       this.setState(({ todoList }) => {
//         const index = todoList.findIndex((x) => x.id === id);
//         return {
//           todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
//         };
//       });
//       this.setSuccessStatus(type, id);
//     } catch (error) {
//       this.setErrorStatus(type, error as Error, id);
//     }
//   };

//   render() {
//     console.log("App rerender");

//     const { todoList, filterType, appStatus } = this.state;

//     const loadingStatus = appStatus.find((x) => x.type === "LOAD_TODO");

//     if (loadingStatus) {
//       if (loadingStatus.state === "LOADING") {
//         return <h1>Loading...</h1>;
//       }
//       if (loadingStatus.state === "ERROR") {
//         return <h1>{loadingStatus.error.message}</h1>;
//       }
//     }

//     return (
//       <div className="container">
//         <h1>Todo App</h1>
//         <TodoForm
//           onSubmit={this.onSubmit}
//           ref={this.inputRef}
//           status={appStatus.find((x) => x.type === "ADD_TODO")}
//         />
//         <TodoList
//           todoList={todoList}
//           completeTodo={this.completeTodo}
//           deleteTodo={this.deleteTodo}
//           status={appStatus.filter(
//             (x) => x.type === "UPDATE_TODO" || x.type === "DELETE_TODO"
//           )}
//         />
//         <TodoFilter filterType={filterType} filterTodo={this.loadData} />
//       </div>
//     );
//   }
// }
