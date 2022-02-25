import Input from "components/Input";
import { FieldType } from "pages/Register/registerFields";

export const loginInitValue = {
  email: "",
  password: "",
  rememberMe: false,
  serverError: undefined,
};

export const loginFields: FieldType[] = [
  {
    id: "email-address",
    name: "email",
    component: Input,
    type: "email",
    placeholder: "Email address",
    autoComplete: "email",
    isFirst: true,
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
    autoComplete: "current-password",
    isLast: true,
    validate: (value: string) => {
      if (!value) {
        return "Required...";
      }
      return undefined;
    },
  },
];
