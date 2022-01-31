import React, { memo } from "react";

type Props = {};

const Child1 = (props: Props) => {
  console.log("Child 1");

  return <div>hello from child 1</div>;
};

export default memo(Child1, (prevProps, nextprop) => {
  return false;
});
