import React from "react";
import "./App.css";
import User from "./Components/User/User";
import AddUser from "./Components/AddUser/Adduser";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateUser from "./Components/UpdateUser/UpdateUser";
const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/addUser",
      element: <AddUser />,
    },
    {
      path: "/updateUser/:id",
      element: <UpdateUser />,
    },
  ]);
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
};

export default App;
