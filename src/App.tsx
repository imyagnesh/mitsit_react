import { ThemeProvider } from "context/themeContext";
import AuthLayout from "layout/AuthLayout";
import NotFound from "pages/404";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

type Props = {};

const App = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route
          index
          element={
            <ThemeProvider>
              <Login />
            </ThemeProvider>
          }
        />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
