import React, { Component } from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./ErrorBoundary";
import Todo from "./Todo";
import "./root.scss";

ReactDOM.render(
  <ErrorBoundary>
    <Todo />
  </ErrorBoundary>,
  document.getElementById("root")
);
