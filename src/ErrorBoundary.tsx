import React, { Component } from "react";

type Props = {};

type State = {};

export default class ErrorBoundary extends Component<Props, State> {
  state = {};

  static getDerivedStateFromError(error) {
    return {
      hasError: error.message,
    };
  }

  componentDidCatch(error, info) {
    console.log(info.componentStack);

    // logging
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <h1>{hasError}</h1>;
    }

    return <>{children}</>;
  }
}
