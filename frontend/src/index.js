import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import GroupScreen from "./screens/GroupScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/group/:id" element={<GroupScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
