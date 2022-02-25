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
import { useAuth } from "context/authContext";

type Props = {};

const Register = (props: Props) => {
  const { handleRegister } = useAuth();

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
