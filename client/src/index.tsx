import 'tailwindcss/tailwind.css';
import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Root } from 'pages/root';
import { LogoutPage } from 'pages/logout.page';
import { RegisterPage } from 'pages/register/register.page';
import { LoginPage } from 'pages/login/login.page';
import { MainPage } from 'pages/main/main.page';
import { Provider } from 'react-redux';
import { store } from 'store/store';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

const routes = createRoutesFromElements(
  <Route
    path="/"
    element={<Root />}
  >
    <Route
      path="register"
      element={<RegisterPage />}
    />
    <Route
      path="login"
      element={<LoginPage />}
    />
    <Route
      path="logout"
      element={<LogoutPage />}
    />
    <Route
      path="chat"
      element={<MainPage />}
    />
    <Route
      path=""
      element={<MainPage />}
    />
  </Route>,
);
const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
);
