import * as React from "react";
import MockAdapter from "axios-mock-adapter";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axiosInstance from "../../utils/axiosInstance";
import Todo from "../index";

const mock = new MockAdapter(axiosInstance);

describe("Todo Component", () => {
  test("should render component", () => {
    const { container } = render(<Todo />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("should display loading on component mount", () => {
    render(<Todo />);
    const pageLoading = screen.queryByTestId("load_todo");
    expect(pageLoading).toBeInTheDocument();
  });

  test("should fail load todo", async () => {
    render(<Todo />);
    const errorLoading = await screen.findByTestId("load_todo_fail");
    expect(errorLoading).toBeInTheDocument();
  });

  test("should display todo container", async () => {
    mock.onGet("todoList").reply(200, [
      {
        text: "get milk",
        isDone: true,
        id: 1,
      },
    ]);
    render(<Todo />);
    const todoContainer = await screen.findByTestId("todo_container");
    expect(todoContainer).toBeInTheDocument();
  });

  test("should display proper error message", async () => {
    mock.onGet("todoList").networkError();
    render(<Todo />);
    const errorLoading = await screen.findByTestId("load_todo_fail");
    expect(errorLoading).toBeInTheDocument();
    expect(errorLoading.innerHTML).toMatch("Network Error");
  });

  test("should display timeout error Message", async () => {
    mock.onGet("todoList").timeout();
    render(<Todo />);
    const errorLoading = await screen.findByTestId("load_todo_fail");
    expect(errorLoading).toBeInTheDocument();
    expect(errorLoading.innerHTML).toMatch(
      "Timeout. Please try after sometime"
    );
  });

  test("should display todo form", async () => {
    mock.onGet("todoList").reply(200, [
      {
        text: "get milk",
        isDone: true,
        id: 1,
      },
    ]);

    mock.onPost("todoList").reply(200, {
      text: "get Food",
      isDone: true,
      id: 1,
    });

    render(<Todo />);
    const todoContainer = await screen.findByTestId("todo_container");
    expect(todoContainer).toBeInTheDocument();
    const todoFormContainer = screen.queryByTestId("todoForm_container");
    expect(todoFormContainer).toBeInTheDocument();
    const todoTextInput = screen.queryByRole("textbox");
    expect(todoTextInput).toBeInTheDocument();
    if (todoTextInput) {
      fireEvent.change(todoTextInput, {
        target: {
          value: "Get Food",
        },
      });
      const submitButton = screen.queryByRole("button", {
        name: "Save",
      });
      if (submitButton) {
        fireEvent.click(submitButton);
        await waitFor(() => expect(submitButton).toBeDisabled());
        await waitFor(() => expect(submitButton).toBeEnabled());
      }
    }
  });
});
