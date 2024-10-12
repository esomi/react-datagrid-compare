import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layouts from "@src/Layouts.tsx";
import RD from "@pages/RD.tsx";
import Material from "@pages/Material.tsx";
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
      { path: "grid5", element: <Material /> },
    ],
  },
]);
export const Providers = () => {
  return (
    <RouterProvider router={router}/>
  );
};

