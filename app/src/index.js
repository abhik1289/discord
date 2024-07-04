import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import NotLoginAccess from "./ProctedRoutes/NotLoginAccess";
import LoginAccess from "./ProctedRoutes/LoginAccess";

const router = createBrowserRouter(createRoutesFromElements(<Route>
  <Route element={<NotLoginAccess/>} >
    <Route
      path="/login"
      element={<Login />}
    />
    <Route
      path="/signup"
      element={<Signup />}
    />
  </Route>
  <Route element={<LoginAccess/>}>
    <Route
      path="/"
      element={<Dashboard />}
    />
  </Route>
</Route>));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider
    store={store}
  >
    <RouterProvider router={router} />
  </Provider>
);