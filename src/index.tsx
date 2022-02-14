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

//  Life Cycle methods

// 1. Mounting

// 1. Constructor ->
// 2. GetDerivedStateFromProps
// 3. render
// 4. componentDidMount

// 2. Updating

// 1. GetDerivedStateFromProps
// 2. ShoudComponentUpdate
// 3. render
// 4. getSnapShotBeforeUpdate -> Not Possible in Function Component
// 5. ComponentDidUpdate

// 3. UnMounting

// 1. ComponentWillUnmount

// 4. Error -> Not Possible in Function Component

// 1. getDerivedStateFromError
// 2. componentDidCatch
