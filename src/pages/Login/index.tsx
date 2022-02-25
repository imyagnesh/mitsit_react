import React from "react";
import CustomForm from "components/customForm";
import { FastField, FormikHelpers } from "formik";
import Checkbox from "components/checkbox";
import { loginFields, loginInitValue } from "./loginFields";
import axiosInstance from "utils/axiosInstance";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();

  const handleLogin = async (
    values: typeof loginInitValue,
    actions: FormikHelpers<typeof loginInitValue>
  ) => {
    try {
      const { rememberMe, serverError, ...rest } = values;
      const res = await axiosInstance.post("login", rest);
      sessionStorage.setItem("@token", JSON.stringify(res.data));
      actions.resetForm();
      navigate("/home", { replace: true });
    } catch (error) {
      let message = "Something went wrong try after sometime.";
      if (error instanceof Error) {
        message = error.message;
      }
      actions.setErrors({ serverError: message });
    }
  };

  return (
    <CustomForm
      initialValues={loginInitValue}
      fields={loginFields}
      onSubmit={handleLogin}
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
