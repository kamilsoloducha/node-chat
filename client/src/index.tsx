import 'tailwindcss/tailwind.css';
import 'style.css';
import './utils/date';
import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { LogoutPage } from 'pages/logout.page';
import { RegisterPage } from 'pages/register/register.page';
import { LoginPage } from 'pages/login/login.page';
import { MainPage } from 'pages/main/main.page';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { Websocket } from 'core/websockets/websocket';
import AxiosEx from 'core/components/AxiosEx';
import { Layout } from 'core/components/Layout';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

const routes = createRoutesFromElements(
  <Route
    path="/"
    element={<Layout />}
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
    <AxiosEx />
    <Provider store={store}>
      <Websocket>
        <RouterProvider router={router}></RouterProvider>
      </Websocket>
    </Provider>
  </React.StrictMode>,
);
