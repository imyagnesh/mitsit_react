import React, { Component } from "react";
import ReactDOM from "react-dom";
import Child1 from "./child1";
import Child2 from "./child2";
import ErrorBoundary from "./ErrorBoundary";
import Header from "./header";
import "./root.scss";

const wait = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
// 1. First Later is capital
// 2. only return single element
// 3. apply inline style as object
// 4. instead of class have to use className

type AppProp = {
  caption: string;
  title: string;
};

// Function Component
// const App = ({ title, caption }: AppProp) => {
//   return (
//     <div>
//       <h1>{title}</h1>
//       <h2>{caption}</h2>
//       <input type="checkbox" />
//     </div>
//   );
// };

// class Component

type Props = {};

type State = {
  a: number;
  b: number;
};

//  manage internal memory(state)
//  methods
//  life cycle method

// let a = 1;

// 4 stages of life cycle method

// 1. Mounting
// 4 lifecycle methods

// 1. constructor
// 2. getDerivedStateFromProps
// 3. render
// 4. componentDidMount

// 2. Updating

// 1. getDerivedStateFromProps
// 2. shouldComponentUpdate
// 3. render
// 4. getSnapshotBeforeUpdate
// 5. componentDidUpdate

// 3. unmounting

// 1. componentWillUnmount

class App extends Component<AppProp, State> {
  state = {
    greet: "",
    todo: null,
    loading: false,
    user: {
      name: "Yagnesh",
      age: 30,
    },
    counter: 0,
  };

  // to derive state value base on props
  // to bind methods
  // analytics
  // call only once
  constructor(props) {
    console.log("Constructor");

    super(props);
    console.log(props);
    // this.state = {
    //   greet: `Hello ${props.name}`,
    // };

    this.changeGreetMessage = this.changeGreetMessage.bind(this);
    // analytics code here
    // server call and send information
  }

  loadData = async () => {
    try {
      this.setState({
        loading: true,
      });
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const json = await res.json();
      this.setState({
        todo: json,
      });
    } catch (error) {
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  // calls everytime whenever props or state value change
  // static getDerivedStateFromProps(props, state) {
  //   console.log("getDerivedStateFromProps");
  //   return null;
  //   // return {
  //   //   greet: state.greet || `Hello ${props.name}`,
  //   // };
  // }

  changeGreetMessage() {
    this.setState((state, props) => {
      return {
        greet: `Hola ${props.name}`,
      };
    });
  }

  // manipulate dom
  // on page load if you want to display data we can use this
  // call only once
  async componentDidMount() {
    console.log("componentDidMount");
    console.log(document.getElementById("para"));
    const p = document.getElementById("para");
    if (p) {
      p.style = "color: red";
    }
    this.loadData();

    // try {
    //   const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    //   const json = await res.json();
    //   this.setState({
    //     todo: json,
    //   });
    // } catch (error) {}
    // fetch("https://jsonplaceholder.typicode.com/todos/1")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log(json);

    //     this.setState({
    //       todo: json,
    //     });
    //   });

    // api call and get data
    // once you get data you can set state
  }

  // take snapshot
  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    return 20;
  }

  // manipulate dom element
  componentDidUpdate(prevProps: Props, prevState: State, snapshot) {
    console.log(snapshot);
  }

  // shouldComponentUpdate(nextProps: Props, nextState: State) {
  //   return false;
  // }

  // return DOM element
  render() {
    console.log("Render");
    const { greet, todo, loading, user, counter, hasError } = this.state;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    if (hasError) {
      return <h1>{hasError}</h1>;
    }

    return (
      <>
        <h1 className="text-red-500">{counter}</h1>
        <button
          type="button"
          onClick={() => {
            this.setState({ counter: counter + 1 });
          }}
        >
          increase Counter
        </button>
        {counter < 5 && <Child2 />}
      </>
    );
  }
}

App.getDerivedStateFromProps = (props, state) => {
  console.log("getDerivedStateFromProps");
  return {
    greet: state.greet || `Hello ${props.name}`,
  };
};

// App.getDerivedStateFromProps(props, state) {
//   //   console.log("getDerivedStateFromProps");
//   //   return null;
//     return {
//       greet: state.greet || `Hello ${props.name}`,
//     };
// };

// Hello Yagnesh
// props are immutable
ReactDOM.render(
  <ErrorBoundary>
    <App name="Yagnesh" />
  </ErrorBoundary>,
  document.getElementById("root")
);
