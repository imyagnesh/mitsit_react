import CustomDatePicker from "components/datePicker";
import Input, { BorderType } from "components/Input";
import {
  FastFieldProps,
  FieldConfig,
  GenericFieldHTMLAttributes,
} from "formik";
import { ComponentType } from "react";

export const registerInitValue = {
  name: "",
  birthDate: new Date(),
  email: "",
  password: "",
  confirmPassword: "",
};

export type FieldType = BorderType & GenericFieldHTMLAttributes & FieldConfig;

export const registerFields: FieldType[] = [
  {
    id: "name",
    name: "name",
    component: Input as ComponentType,
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
    component: Input as ComponentType,
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
    component: Input as ComponentType,
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
    component: Input as ComponentType,
    type: "password",
    placeholder: "Confirm Password",
    autoComplete: "new-password",
    isLast: true,
    validate: (value: string) => {
      if (!value) {
        return "Required...";
      } else if (value !== password.value) {
        return "Error.";
      }
      return undefined;
    },
  },
];
