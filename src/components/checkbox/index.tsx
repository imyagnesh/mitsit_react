import { FastFieldProps } from 'formik';
import React, { memo } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> &
  React.LabelHTMLAttributes<HTMLLabelElement> &
  FastFieldProps;

const Checkbox = ({
  field: { name, checked, onChange },
  id,
  children,
  ...props
}: Props) => (<div className="flex items-center">
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      {...props}
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
      {children}
    </label>
  </div>)

export default memo(Checkbox);
