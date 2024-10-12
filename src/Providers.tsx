import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layouts from "@src/Layouts.tsx";
import RD from "@pages/RD.tsx";
import MRT from "@pages/MRT.tsx";
import MUI from "@pages/MUI.tsx";
import Tanstack from "@pages/Tanstack.tsx";
import {AG} from "@pages/AG.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      { index: true, element: <Tanstack /> }, //default route
      { path: "grid1", element: <Tanstack /> },
      { path: "grid2", element: <MUI /> },
      { path: "grid3", element: <AG />},
      { path: "grid4", element: <RD /> },
      { path: "grid5", element: <MRT /> },
    ],
  },
]);
export const Providers = () => {
  return (
    <RouterProvider router={router}/>
  );
};

