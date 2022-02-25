import { useAuth } from "context/authContext";
import { ThemeConsumer } from "context/themeContext";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
  const { session } = useAuth();

  console.log("session", session);

  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <ThemeConsumer>
          {(values) => {
            console.log("Auth Layout", values);
            return null;
          }}
        </ThemeConsumer>
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </a>
          </p>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

AuthLayout.displayName = "Auth Layout";

export default AuthLayout;
