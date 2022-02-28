import React from 'react';
import { ThemeProvider } from 'context/themeContext';
import AuthLayout from 'layout/AuthLayout';
import MainLayout from 'layout/MainLayout';
import NotFound from 'pages/404';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import { Routes, Route } from 'react-router-dom';

// type Props = {};

const App = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
    </Route>

    <Route path="/auth" element={<AuthLayout />}>
      <Route
        index
        element={
          <ThemeProvider>
            <Login />
          </ThemeProvider>
          }
      />
      <Route path="/auth/register" element={<Register />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
