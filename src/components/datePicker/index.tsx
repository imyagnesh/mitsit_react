import classNames from 'classnames';
import { BorderType } from 'components/Input';
import { FastFieldProps, FieldProps } from 'formik';
import React, { memo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = BorderType & FastFieldProps;

const CustomDatePicker = ({
  field: { name, value, onBlur },
  form: { touched, errors, setFieldValue },
  isFirst,
  isLast,
}: Props) => {
  const error = touched[name] ? errors[name] : undefined;
  return (
    <DatePicker
      name={name}
      className={classNames(
        'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
        {
          'rounded-t-md': !!isFirst,
          'rounded-b-md': !!isLast,
          'border-red-500': !!error,
        },
      )}
      selected={value}
      onChange={(date) => setFieldValue(name, date, true)}
      onBlur={onBlur}
      placeholderText="Birth Date"
    />
  );
}

export default memo(CustomDatePicker);
