import React from "react";
import CustomForm from "components/customForm";
import { registerFields, registerInitValue } from "./registerFields";

type Props = {};

const Register = (props: Props) => {
  return (
    <CustomForm
      initialValues={registerInitValue}
      onSubmit={(values) => {
        console.log(values);
      }}
      btnProps={{
        children: "Sign Up",
      }}
      fields={registerFields}
      // validate={(values) => {
      //   const errors = {} as typeof values;
      //   if (values.password !== values.confirmPassword) {
      //     errors.confirmPassword =
      //       "Password should match with confirm Password";
      //   }
      //   return errors;
      // }}
    />
  );
};

Register.displayName = "Not Found";

export default Register;
