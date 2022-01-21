import React, { Component } from "react";
import ReactDOM from "react-dom";
import Child1 from "./child1";
import Child2 from "./child2";
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
class App extends Component<AppProp, State> {
  state = {
    a: 1,
    b: 2,
  };

  changeA = async () => {
    // await wait(100);
    console.log(this);

    this.setState(
      ({ a }) => {
        return { a: ++a };
      },
      () => {
        console.log(this.state.a);
      }
    );

    // console.log("1");
    // this.setState({ b: 3 });
    // console.log("2");
    // this.setState({ a: 4 });
  };

  render() {
    console.log("render");

    const { title, caption } = this.props;
    const { a, b } = this.state;

    return (
      <>
        <Header paths={["Home", "About", "Contact"]} />
        <Header paths={["Home", "Projects", "Blog", "Contact"]} />
        <main>
          <section id="banner"></section>
        </main>
        <footer></footer>
      </>
    );
  }
}

ReactDOM.render(
  <App title="Hello From Props" caption="Function component is best" />,
  document.getElementById("root")
);
