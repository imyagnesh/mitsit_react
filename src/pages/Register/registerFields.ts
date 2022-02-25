import CustomDatePicker from "components/datePicker";
import Input, { BorderType } from "components/Input";
import { FieldConfig, GenericFieldHTMLAttributes } from "formik";

export const registerInitValue = {
  name: "",
  birthDate: new Date(),
  email: "",
  password: "",
  confirmPassword: "",
  serverError: undefined,
};

export type FieldType = BorderType & GenericFieldHTMLAttributes & FieldConfig;

export const registerFields: FieldType[] = [
  {
    id: "name",
    name: "name",
    component: Input,
    placeholder: "Name",
    autoComplete: "name",
    isFirst: true,
    validate: (value: string) => {
      if (!value) {
        return "Required...";
      }
      return undefined;
    },
  },
  {
    id: "birth-date",
    name: "birthDate",
    component: CustomDatePicker,
    placeholder: "Birth Date",
    validate: (value: string) => {
      if (!value) {
        return "Required...";
      }
      return undefined;
    },
  },
  {
    id: "email-address",
    name: "email",
    component: Input,
    type: "email",
    placeholder: "Email address",
    autoComplete: "email",
    validate: (value: string) => {
      if (!value) {
        return "Required...";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return "Invalid email address";
      }
      return undefined;
    },
  },
  {
    id: "password",
    name: "password",
    component: Input,
    type: "password",
    placeholder: "Password",
    autoComplete: "new-password",
    validate: (value: string) => {
      if (!value) {
        return "Required...";
      }
      return undefined;
    },
  },
  {
    id: "confirm-password",
    name: "confirmPassword",
    component: Input,
    type: "password",
    placeholder: "Confirm Password",
    autoComplete: "new-password",
    isLast: true,
    validate: (value: string) => {
      if (!value) {
        return "Required...";
      }
      return undefined;
    },
  },
];

export const validateRegister = (values: typeof registerInitValue) => {
  const errors = {} as typeof values;
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password should match with confirm Password";
  }
  return errors;
};
