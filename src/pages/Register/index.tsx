import React from "react";
import CustomForm from "components/customForm";
import {
  registerFields,
  registerInitValue,
  validateRegister,
} from "./registerFields";
import { FormikHelpers } from "formik";
import axiosInstance from "utils/axiosInstance";
import { useNavigate } from "react-router-dom";

type Props = {};

const Register = (props: Props) => {
  const navigate = useNavigate();
  const handleRegister = async (
    values: typeof registerInitValue,
    actions: FormikHelpers<typeof registerInitValue>
  ) => {
    try {
      const { serverError, confirmPassword, birthDate, ...rest } = values;
      const res = await axiosInstance.post("register", {
        birthDate: birthDate.toISOString(),
        ...rest,
      });
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
      initialValues={registerInitValue}
      onSubmit={handleRegister}
      btnProps={{
        children: "Sign Up",
      }}
      fields={registerFields}
      validate={validateRegister}
    />
  );
};

Register.displayName = "Not Found";

export default Register;
