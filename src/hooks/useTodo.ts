import React, { useReducer, useRef } from "react";
import todoReducer, { TodoInitValues } from "../reducers/todoReducer";
import { FilterType, TodoItemType } from "../types/todo";
import axiosInstance from "../utils/axiosInstance";

const useTodo = (inputRef: React.MutableRefObject<HTMLInputElement>) => {
  const [{ appStatus, filterType, todoList }, dispatch] = useReducer(
    todoReducer,
    TodoInitValues
  );

  const loadData = React.useCallback(async (ft: FilterType) => {
    const type = "LOAD_TODO";
    try {
      dispatch({
        type: "LOAD_TODO_REQUEST",
        appStatus: { type, state: "LOADING" },
      });

      let url = "todoList";
      if (ft !== "all") {
        url = `${url}?isDone=${ft === "completed"}`;
      }
      const res = await axiosInstance.get<TodoItemType[]>(url);
      dispatch({
        type: "LOAD_TODO_SUCCESS",
        appStatus: { type, state: "SUCCESS" },
        filterType: ft,
        todoList: res.data,
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

  const completeTodo = React.useCallback(async (todoItem: TodoItemType) => {
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
      const res = await axiosInstance.put<TodoItemType>(
        `todoList/${todoItem.id}`,
        {
          ...todoItem,
          isDone: !todoItem.isDone,
        }
      );
      dispatch({
        type: "UPDATE_TODO_SUCCESS",
        appStatus: {
          state: "SUCCESS",
          type,
          id: todoItem.id,
        },
        todoItem: res.data,
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

  const deleteTodo = React.useCallback(async (todoItem: TodoItemType) => {
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
      await axiosInstance.delete(`todoList/${todoItem.id}`);
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

  const onSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
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
          const res = await axiosInstance.post<TodoItemType>("todoList", {
            text: text,
            isDone: false,
          });
          dispatch({
            type: "ADD_TODO_SUCCESS",
            todoItem: res.data,
            appStatus: {
              type,
              state: "SUCCESS",
            },
          });
          inputRef.current.value = "";
        }
      } catch (error) {
        console.log(error);

        dispatch({
          type: "ADD_TODO_FAIL",
          appStatus: {
            state: "ERROR",
            type,
            error: error as Error,
          },
        });
      }
    },
    []
  );

  return {
    loadData,
    completeTodo,
    deleteTodo,
    onSubmit,
    appStatus,
    filterType,
    todoList,
  };
};

export default useTodo;
