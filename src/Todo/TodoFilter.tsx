import classNames from "classnames";
import React, { memo } from "react";
import { FilterType } from ".";

type Props = {
  filterTodo: (filterType: FilterType) => void;
  filterType: FilterType;
};

const TodoFilter = ({ filterTodo, filterType }: Props) => {
  return (
    <div className="flex">
      <button
        onClick={() => filterTodo(FilterType.all)}
        className={classNames("flex-1 py-2 bg-blue-500 text-white", {
          "bg-green-500": filterType === FilterType.all,
        })}
        type="button"
      >
        All
      </button>
      <button
        onClick={() => filterTodo(FilterType.pending)}
        className={classNames("flex-1 py-2 bg-blue-500 text-white", {
          "bg-green-500": filterType === FilterType.pending,
        })}
        type="button"
      >
        Pending
      </button>
      <button
        onClick={() => filterTodo(FilterType.completed)}
        className={classNames("flex-1 py-2 bg-blue-500 text-white", {
          "bg-green-500": filterType === FilterType.completed,
        })}
        type="button"
      >
        Completed
      </button>
    </div>
  );
};

export default memo(TodoFilter);
