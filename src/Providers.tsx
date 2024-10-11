import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layouts from "@src/Layouts.tsx";
import RD from "@pages/RD.tsx";
import Material from "@pages/Material.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts/>,
    children: [
      {index: true, path: "/grid4", element: <RD/>},
      {index: true, path: "/grid5", element: <Material/>},
    ],
  },
]);
export const Providers = () => {
  return (
    <RouterProvider router={router}/>
  );
};

