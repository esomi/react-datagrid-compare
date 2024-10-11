import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layouts from "@src/Layouts.tsx";
import RD from "@pages/RD.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts/>,
    children: [
      {index: true, path: "/grid1", element: <RD/>},
      {index: true, path: "/grid2", element: <RD/>},
      {index: true, path: "/grid3", element: <RD/>},
    ],
  },
]);
export const Providers = () => {
  return (
    <RouterProvider router={router}/>
  );
};

