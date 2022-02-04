import React, { FormEvent, memo, forwardRef } from "react";

type Props = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type Ref = HTMLInputElement;

const TodoForm = forwardRef<Ref, Props>(({ onSubmit }, ref) => {
  console.log("Todo Form");

  return (
    <form className="flex justify-center" onSubmit={onSubmit}>
      <div className="w-full sm:w-1/2 md:w-1/4">
        <label htmlFor="todo-text" className="hidden">
          First name
        </label>
        <input
          ref={ref}
          type="text"
          name="todo-text"
          id="todo-text"
          className="text-input"
        />
      </div>
      <button type="submit" className="btn">
        Save
      </button>
    </form>
  );
});

TodoForm.displayName = "TodoForm";

export default memo(TodoForm);
