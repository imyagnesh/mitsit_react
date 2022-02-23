import React, { useContext } from "react";
import LockIcon from "assets/icons/lock.svg";
import Input from "components/Input";
import Checkbox from "components/checkbox";
import { ThemeConsumer, ThemeContext } from "context/themeContext";
import { Formik, FastField, Form } from "formik";
import { loginFields, loginInitValue } from "./loginFields";

type Props = {};

const Login = (props: Props) => {
  return (
    <Formik
      initialValues={loginInitValue}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <Form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {loginFields.map((x) => (
                <FastField key={x.name} {...x} />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <FastField
                id="remember-me"
                name="rememberMe"
                component={Checkbox}
              >
                Remember Me
              </FastField>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!(dirty && isValid)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockIcon width={24} height={24} fill="rgb(99 102 241)" />
                </span>
                Sign in
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

Login.displayName = "Not Found";

export default Login;
