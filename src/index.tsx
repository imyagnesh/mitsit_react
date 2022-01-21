import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./root.scss";

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

// type State = {};

//  manage internal memory(state)
//  methods
//  life cycle method

class App extends Component<AppProp> {
  //   state = {};

  render() {
    const { title, caption } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <h1>{caption}</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <App title="Hello From Props" caption="Function component is best" />,
  document.getElementById("root")
);
