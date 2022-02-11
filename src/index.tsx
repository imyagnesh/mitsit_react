import React, {
  useEffect,
  useState,
  useRef,
  memo,
  useCallback,
  useMemo,
} from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./ErrorBoundary";
// import Todo from "./Todo";
import "./root.scss";

// Hooks -> special functions whoes name start with "use" keyword

const Child = memo(({ onChange, data }) => {
  console.log("Child Component");

  useEffect(() => {
    // const mouseMove = () => {
    //   console.log("mouse move");
    // };
    // document.addEventListener("mousemove", mouseMove);
    // // componentWillUnmount
    // return () => {
    //   document.removeEventListener("mousemove", mouseMove);
    // };
  }, []);

  return (
    <div>
      <h1>Child Component</h1>
      <p>Data: {data.a}</p>
      <button onClick={() => onChange()}>Change Test</button>
    </div>
  );
});

const App = ({ value }) => {
  const [counter, setCounter] = useState(value);
  const [test, setTest] = useState(5);
  let isLoaded = useRef(false);

  // console.log("test", test);

  // if dependency is there then useEffect behave as CDM + CDU
  useEffect(() => {
    if (isLoaded.current) {
      console.log("Component did update");
      setTest(counter + test);
    }
  }, [counter]);

  // if dependency "[]" Component Did Mount
  useEffect(() => {
    console.log("Component Did Mount");
    isLoaded.current = true;
  }, []);

  // console.log(counter);

  const increment = () => {
    // console.log("Increment Called");
    setCounter(counter + 1);
  };

  const decrement = () => {
    // console.log("Decrement Called");
    setCounter(counter - 1);
  };

  // use Callback is for function
  const ChangeTestValue = useCallback(() => {
    console.log("test");
    setTest(25);
  }, []);

  // use Memo is for non-premitive varibales
  const testVariable = useMemo(
    () => ({
      a: counter,
    }),
    [counter]
  );

  return (
    <div>
      <button type="button" onClick={increment}>
        +
      </button>
      <h1>{counter}</h1>
      <button type="button" onClick={decrement}>
        -
      </button>

      <button onClick={() => {}}>Change A</button>

      <p>Test value: {test}</p>
      {counter < 5 && <Child onChange={ChangeTestValue} data={testVariable} />}
    </div>
  );
};

ReactDOM.render(
  <ErrorBoundary>
    <App value={0} />
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
