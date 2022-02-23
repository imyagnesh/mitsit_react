import React from "react";
import CustomForm from "components/customForm";
import { FastField } from "formik";
import Checkbox from "components/checkbox";
import { loginFields, loginInitValue } from "./loginFields";

type Props = {};

const Login = (props: Props) => {
  return (
    <CustomForm
      initialValues={loginInitValue}
      fields={loginFields}
      onSubmit={(values) => {
        console.log(values);
      }}
      btnProps={{
        children: "Sign In",
      }}
    >
      <div className="flex items-center justify-between">
        <FastField id="remember-me" name="rememberMe" component={Checkbox}>
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
    </CustomForm>
  );
};

Login.displayName = "Not Found";

export default Login;
