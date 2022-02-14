import {
  AppStatus,
  BaseTypeStatus,
  LoadingAppStatus,
  StatusType,
} from "../types/common";
import { FilterType, TodoItemType } from "../types/todo.d";

export type TodoStateType = {
  todoList: TodoItemType[];
  filterType: FilterType;
  appStatus: AppStatus[];
};

export const TodoInitValues: TodoStateType = {
  todoList: [],
  filterType: "all",
  appStatus: [],
};

type LoadTodoRequestType = {
  type: "LOAD_TODO_REQUEST";
  appStatus: AppStatus;
  todoList?: never;
  filterType?: never;
  todoItem?: never;
};

type AddTodoRequestType = {
  type: "ADD_TODO_REQUEST";
  appStatus: AppStatus;
  todoList?: never;
  filterType?: never;
  todoItem?: never;
};

type UpdateTodoRequestType = {
  type: "UPDATE_TODO_REQUEST";
  appStatus: AppStatus;
  todoList?: never;
  filterType?: never;
  todoItem?: never;
};

type DeleteTodoRequestType = {
  type: "DELETE_TODO_REQUEST";
  appStatus: AppStatus;
  todoList?: never;
  filterType?: never;
  todoItem?: never;
};

type LoadTodoSuccessType = {
  type: "LOAD_TODO_SUCCESS";
  appStatus: AppStatus;
  todoList: TodoItemType[];
  filterType: FilterType;
  todoItem?: never;
};

type AddTodoSuccessType = {
  type: "ADD_TODO_SUCCESS";
  appStatus: AppStatus;
  todoItem: TodoItemType;
  filterType?: never;
  todoList?: never;
};

type UpdateTodoSuccessType = {
  type: "UPDATE_TODO_SUCCESS";
  appStatus: AppStatus;
  todoItem: TodoItemType;
  filterType?: never;
  todoList?: never;
};

type DeleteTodoSuccessType = {
  type: "DELETE_TODO_SUCCESS";
  appStatus: AppStatus;
  todoItem: TodoItemType;
  filterType?: never;
  todoList?: never;
};

type LoadTodoFailType = {
  type: "LOAD_TODO_FAIL";
  appStatus: AppStatus;
  todoList?: never;
  filterType?: never;
  todoItem?: never;
};

type AddTodoFailType = {
  type: "ADD_TODO_FAIL";
  appStatus: AppStatus;
  todoList?: never;
  filterType?: never;
  todoItem?: never;
};

type UpdateTodoFailType = {
  type: "UPDATE_TODO_FAIL";
  appStatus: AppStatus;
  todoList?: never;
  filterType?: never;
  todoItem?: never;
};

type DeleteTodoFailType = {
  type: "DELETE_TODO_FAIL";
  appStatus: AppStatus;
  todoList?: never;
  filterType?: never;
  todoItem?: never;
};

type TodoActions =
  | LoadTodoRequestType
  | LoadTodoSuccessType
  | LoadTodoFailType
  | AddTodoRequestType
  | AddTodoSuccessType
  | AddTodoFailType
  | UpdateTodoRequestType
  | UpdateTodoSuccessType
  | UpdateTodoFailType
  | DeleteTodoRequestType
  | DeleteTodoSuccessType
  | DeleteTodoFailType;

export default (
  store: TodoStateType,
  { type, appStatus, todoList, filterType, todoItem }: TodoActions
): TodoStateType => {
  switch (type) {
    case "LOAD_TODO_REQUEST":
    case "ADD_TODO_REQUEST":
    case "UPDATE_TODO_REQUEST":
    case "DELETE_TODO_REQUEST": {
      const newStatus = {
        ...appStatus,
        state: "LOADING",
      } as BaseTypeStatus & LoadingAppStatus;
      return { ...store, appStatus: [...store.appStatus, newStatus] };
    }

    case "LOAD_TODO_SUCCESS": {
      return {
        ...store,
        todoList: todoList as TodoItemType[],
        filterType: filterType as FilterType,
        appStatus: store.appStatus.filter(
          (x) => !(x.type == appStatus.type && x.id === appStatus.id)
        ),
      };
    }

    case "ADD_TODO_SUCCESS": {
      return {
        ...store,
        todoList: [...store.todoList, todoItem as TodoItemType],
        appStatus: store.appStatus.filter(
          (x) => !(x.type == appStatus.type && x.id === appStatus.id)
        ),
      };
    }

    case "UPDATE_TODO_SUCCESS": {
      const index = store.todoList.findIndex((x) => x.id === todoItem?.id);
      return {
        ...store,
        todoList: [
          ...store.todoList.slice(0, index),
          todoItem as TodoItemType,
          ...store.todoList.slice(index + 1),
        ],
        appStatus: store.appStatus.filter(
          (x) => !(x.type == appStatus.type && x.id === appStatus.id)
        ),
      };
    }

    case "DELETE_TODO_SUCCESS": {
      const index = store.todoList.findIndex((x) => x.id === todoItem?.id);
      return {
        ...store,
        todoList: [
          ...store.todoList.slice(0, index),
          ...store.todoList.slice(index + 1),
        ],
        appStatus: store.appStatus.filter(
          (x) => !(x.type == appStatus.type && x.id === appStatus.id)
        ),
      };
    }

    case "LOAD_TODO_FAIL":
    case "ADD_TODO_FAIL":
    case "ADD_TODO_FAIL":
    case "UPDATE_TODO_FAIL":
    case "DELETE_TODO_FAIL":
      return {
        ...store,
        appStatus: store.appStatus.map((x) => {
          if (x.type === appStatus.type && x.id === appStatus.id) {
            return { ...x, state: "ERROR", error: appStatus.error as Error };
          }
          return x;
        }),
      };

    default:
      return store;
  }
};
