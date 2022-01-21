import React from "react";

type Props = {};

const Child1 = (props: Props) => {
  console.log("Child 1");

  return <div>hello from child 1</div>;
};

export default Child1;
