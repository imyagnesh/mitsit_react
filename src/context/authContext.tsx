import { FormikHelpers } from "formik";
import { loginInitValue } from "pages/Login/loginFields";
import { registerInitValue } from "pages/Register/registerFields";
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "utils/axiosInstance";

type AuthContextType = {
  handleLogin: (
    values: typeof loginInitValue,
    actions: FormikHelpers<typeof loginInitValue>
  ) => Promise<void>;
  handleRegister: (
    values: typeof registerInitValue,
    actions: FormikHelpers<typeof registerInitValue>
  ) => Promise<void>;
  logout: () => void;
  session?: AuthResponse;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: FC = ({ children }) => {
  const [session, setSession] = useState<AuthResponse | undefined>(undefined);

  useEffect(() => {
    const token = sessionStorage.getItem("@token");
    if (token) {
      setSession(JSON.parse(token));
    }
  }, []);

  const handleLogin = useCallback(
    async (
      values: typeof loginInitValue,
      actions: FormikHelpers<typeof loginInitValue>
    ) => {
      try {
        const { rememberMe, serverError, ...rest } = values;
        const res = await axiosInstance.post("login", rest);
        sessionStorage.setItem("@token", JSON.stringify(res.data));
        actions.resetForm();
        setSession(res.data);
      } catch (error) {
        let message = "Something went wrong try after sometime.";
        if (error instanceof Error) {
          message = error.message;
        }
        actions.setErrors({ serverError: message });
      }
    },
    []
  );

  const handleRegister = useCallback(
    async (
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
        setSession(res.data);
      } catch (error) {
        let message = "Something went wrong try after sometime.";
        if (error instanceof Error) {
          message = error.message;
        }
        actions.setErrors({ serverError: message });
      }
    },
    []
  );

  const logout = useCallback(() => {
    sessionStorage.clear();
    setSession(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleRegister, logout, session }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
