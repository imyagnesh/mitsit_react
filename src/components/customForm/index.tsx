import { FastField, Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { FC } from "react";
import { FieldType } from "pages/Register/registerFields";

type Props<T> = {
  fields: FieldType[];
  btnProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
} & FormikConfig<T>;

const CustomForm = <T extends FormikValues = FormikValues>({
  children,
  fields,
  btnProps,
  ...rest
}: Props<T>) => {
  return (
    <Formik {...rest}>
      {({ dirty, isValid, isSubmitting, errors }) => {
        return (
          <Form className="mt-8 space-y-6">
            {errors.serverError && (
              <p className="text-xl text-red-500 text-center">
                {errors.serverError}
              </p>
            )}
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {fields.map((x) => (
                <FastField key={x.name} {...x} />
              ))}
            </div>
            {children}
            <div>
              <button
                type="submit"
                disabled={!(dirty && isValid) || isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400"
                {...btnProps}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomForm;
