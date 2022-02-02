import React, { forwardRef } from "react";

type Props = {
  onSubmit: () => void;
};

type Ref = HTMLInputElement[];

const Test = forwardRef<Ref, Props>(({ onSubmit }: Props, ref) => {
  return (
    <div>
      {/* <input
        type="text"
        placeholder="First Name"
        ref={(el) => (ref.current[0] = el)}
      />
      <input
        type="text"
        placeholder="Last Name"
        ref={(el) => (ref.current[1] = el)}
      /> */}
      <button type="button" onClick={onSubmit}>
        Get Data
      </button>
    </div>
  );
});

export default Test;
