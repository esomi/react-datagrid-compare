import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layouts from "@src/Layouts.tsx";
import {Home} from "@pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts/>,
    children: [
      {index: true, path: "/nav1", element: <Home/>},
      {index: true, path: "/nav2", element: <Home/>},
      {index: true, path: "/nav3", element: <Home/>},
    ],
  },
]);
export const Providers = () => {
  return (
    <RouterProvider router={router}/>
  );
};

