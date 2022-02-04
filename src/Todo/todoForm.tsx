import React, { FormEvent, memo, forwardRef } from "react";

type Props = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  ref1: (ele: HTMLInputElement) => void;
  ref2: (ele: HTMLInputElement) => void;
};

export type Ref = HTMLInputElement;

const TodoForm = forwardRef<Ref, Props>(({ onSubmit, ref1, ref2 }, ref) => {
  console.log("Todo Form");

  return (
    <form className="flex justify-center" onSubmit={onSubmit}>
      <div className="w-full sm:w-1/2 md:w-1/4">
        <label htmlFor="todo-text" className="hidden">
          First name
        </label>
        <input
          ref={(ele) => {
            ref1(ele);
          }}
          type="text"
          name="todo-text"
          id="todo-text"
          className="text-input"
        />
        <input
          ref={(ele) => {
            ref2(ele);
          }}
          type="text"
          name="todo-text1"
          id="todo-text1"
          className="text-input"
        />
      </div>
      <button type="submit" className="btn">
        Save
      </button>
    </form>
  );
});

export default memo(TodoForm);
