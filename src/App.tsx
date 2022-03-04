import React from 'react';
import { ThemeProvider } from 'context/themeContext';
import AuthLayout from 'layout/AuthLayout';
import MainLayout from 'layout/MainLayout';
import NotFound from 'pages/404';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import { Routes, Route } from 'react-router-dom';
import { ProductsProvider } from 'context/productsProvider';
import { CartProvider } from 'context/cartContext';

// type Props = {};

const App = () => (
  <Routes>
    <Route
      path="/"
      element={
        <CartProvider>
          <MainLayout />
        </CartProvider>
      }
    >
      <Route
        index
        element={
          <ProductsProvider>
            <Home />
          </ProductsProvider>
        }
      />
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
