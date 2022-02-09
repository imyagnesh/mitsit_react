import classNames from "classnames";
import React, { memo } from "react";
import { FilterType } from ".";

type Props = {
  filterTodo: (filterType: FilterType) => void;
  filterType: FilterType;
};

const TodoFilter = ({ filterTodo, filterType }: Props) => {
  // console.log("TodoFilter render");

  return (
    <div className="flex">
      <button
        onClick={() => filterTodo("all")}
        className={classNames("flex-1 py-2 bg-blue-500 text-white", {
          "bg-green-500": filterType === "all",
        })}
        type="button"
      >
        All
      </button>
      <button
        onClick={() => filterTodo("pending")}
        className={classNames("flex-1 py-2 bg-blue-500 text-white", {
          "bg-green-500": filterType === "pending",
        })}
        type="button"
      >
        Pending
      </button>
      <button
        onClick={() => filterTodo("completed")}
        className={classNames("flex-1 py-2 bg-blue-500 text-white", {
          "bg-green-500": filterType === "completed",
        })}
        type="button"
      >
        Completed
      </button>
    </div>
  );
};

export default memo(TodoFilter, () => {
  return true;
});
