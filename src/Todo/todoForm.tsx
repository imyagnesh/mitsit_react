import React, { FormEvent, memo, forwardRef } from "react";
import { AppStatus } from ".";

type Props = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  status: AppStatus | undefined;
};

export type Ref = HTMLInputElement;

const TodoForm = forwardRef<Ref, Props>(({ onSubmit, status }, ref) => {
  // console.log("Todo Form");

  return (
    <form
      data-testid="todoForm_container"
      className="flex justify-center"
      onSubmit={onSubmit}
    >
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
      <button
        disabled={status && status.state === "LOADING"}
        type="submit"
        className="btn disabled:bg-slate-500"
      >
        Save
      </button>
    </form>
  );
});

TodoForm.displayName = "TodoForm";

export default memo(TodoForm);
