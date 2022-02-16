import * as React from "react";
import {
  fireEvent,
  render as renderRtl,
  RenderResult,
  screen,
} from "@testing-library/react";
import TodoItem from "../TodoItem";
import { TodoItemType } from "../../types/todo";

const todoItem: TodoItemType = {
  text: "get milk",
  isDone: true,
  id: 1,
};

const completeTodo = jest.fn();
const deleteTodo = jest.fn();

const render = ({ ...props } = {}) => {
  const ui = (
    <TodoItem
      todoItem={todoItem}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
      {...props}
    />
  );
  return renderRtl(ui);
};

describe("TodoItem Component", () => {
  let renderItem: typeof render;

  test("should render TodoItem", () => {
    // const container = screen.queryByTestId("todo_item_container");
    const { container } = render();

    expect(container.firstChild).toBeInTheDocument();
  });

  test("should all the elements are available", () => {
    render();
    const deleteBtn = screen.queryByRole("button", { name: "Delete" });
    expect(deleteBtn).toBeInTheDocument();
    const check = screen.queryByRole("checkbox", {
      checked: todoItem.isDone,
    });
    expect(check).toBeInTheDocument();
    expect(deleteTodo).toBeCalledTimes(0);
    const text = screen.queryByText(todoItem.text);
    expect(text).toBeInTheDocument();
  });

  test("should click delete button", () => {
    const { debug } = render();
    const deleteBtn = screen.queryByRole("button", { name: "Delete" });
    if (deleteBtn) {
      fireEvent.click(deleteBtn);
      expect(deleteTodo).toBeCalledTimes(1);
      expect(deleteTodo).toBeCalledWith(todoItem);
    }
  });

  test("should complete todo", () => {
    const { debug, rerender } = render();
    const checkbox = screen.queryByRole("checkbox", { checked: true });

    if (checkbox) {
      fireEvent.click(checkbox);
      expect(completeTodo).toBeCalledTimes(1);
      expect(completeTodo).toBeCalledWith(todoItem);
      rerender(
        <TodoItem
          todoItem={{ ...todoItem, isDone: false }}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
      );
      expect(checkbox).not.toBeChecked();
    }
  });

  test("should disable delete button", () => {
    render({
      status: {
        type: "DELETE_TODO",
        state: "LOADING",
      },
    });

    const deleteBtn = screen.queryByRole("button", { name: "Delete" });
    expect(deleteBtn).toBeDisabled();
  });

  test("should checkbox disabled", () => {
    render({
      status: {
        type: "UPDATE_TODO",
        state: "LOADING",
      },
    });

    const checkbox = screen.queryByRole("checkbox", { checked: true });
    expect(checkbox).toBeDisabled();
  });
});
