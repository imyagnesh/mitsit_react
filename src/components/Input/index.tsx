import React, { InputHTMLAttributes } from "react";
import classnames from "classnames";
import { ThemeConsumer } from "context/themeContext";

type TopBorderType = {
  isFirst?: boolean;
  isLast?: never;
};

type BottomBorderType = {
  isFirst?: never;
  isLast?: boolean;
};

type BorderType = TopBorderType | BottomBorderType;

type Props = BorderType & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ isFirst, isLast, id, placeholder, ...props }: Props) => {
  return (
    <div>
      <ThemeConsumer>
        {(values) => {
          console.log("Child", values);
          return null;
        }}
      </ThemeConsumer>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        className={classnames(
          "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
          {
            "rounded-t-md": !!isFirst,
            "rounded-b-md": !!isLast,
          }
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
