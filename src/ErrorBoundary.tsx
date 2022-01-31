import React, { ErrorInfo, PureComponent } from "react";

type Props = {};

type State = {
  hasError: string;
};

export default class ErrorBoundary extends PureComponent<Props, State> {
  state = {
    hasError: "",
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: error.message,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error);
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
