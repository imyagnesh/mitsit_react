import React, { PureComponent } from "react";
import shallowCompare from "react-addons-shallow-compare"; // ES6

type Props = {};

type State = {};

class Child2 extends PureComponent<Props, State> {
  state = {
    counter: 0,
  };

  // shouldComponentUpdate(nextProps: Props, nextState: State) {
  //   // if (this.props !== nextProps || this.state !== nextProps) {
  //   //   return true;
  //   // }
  //   // return false;
  //   return shallowCompare(this, nextProps, nextState);
  // }

  mouseMove = () => {
    console.log("mouse move");
  };

  componentDidMount() {
    // document.addEventListener("mousemove", this.mouseMove);
    // this.interval = setInterval(() => {
    //   console.log("Interval started");
    // }, 1000);
  }

  componentWillUnmount() {
    // document.removeEventListener("mousemove", this.mouseMove);
    // clearInterval(this.interval);
  }

  incrementCounter = () => {
    try {
      // throw new Error("hello");
      this.setState((state) => ({ counter: state.counter + 1 }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log("child 2 render");
    const { counter } = this.state;

    if (counter > 5) {
      throw new Error("Something went wrong...");
    }

    return (
      <div>
        <h1>Hello chilld 2 component</h1>
        <h2>{`Counter: ${counter}`}</h2>
        <button type="button" onClick={this.incrementCounter}>
          Increment Counter
        </button>
      </div>
    );
  }
}

export default Child2;
