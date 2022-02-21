import React, { useContext } from "react";
import LockIcon from "assets/icons/lock.svg";
import Input from "components/Input";
import Checkbox from "components/checkbox";
import { ThemeConsumer, ThemeContext } from "context/themeContext";

type Props = {};

const Login = (props: Props) => {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log("Login component");

  return (
    <form className="mt-8 space-y-6" action="#" method="POST">
      <div>
        <h1>Current Theme is {theme}</h1>
        <button
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Change theme
        </button>
      </div>

      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <Input
          id="email-address"
          name="email"
          type="email"
          placeholder="Email address"
          autoComplete="email"
          required
          isFirst
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          isLast
        />
      </div>

      <div className="flex items-center justify-between">
        <Checkbox id="remember-me" name="rememberMe">
          Remember Me
        </Checkbox>
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockIcon width={24} height={24} fill="rgb(99 102 241)" />
          </span>
          Sign in
        </button>
      </div>

      <div>
        <h1>Current Theme is {theme}</h1>
      </div>
    </form>
  );
};

Login.displayName = "Not Found";

export default Login;
