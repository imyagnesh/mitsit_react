import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> &
  React.LabelHTMLAttributes<HTMLLabelElement>;

const Checkbox = ({ id, children, ...props }: Props) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        {...props}
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
