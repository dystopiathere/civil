import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HUDLayout, characterCreatorRoute, inventoryRoute } from "~/pages";
import { pathKeys } from "~/shared/lib";

const router = createBrowserRouter([
  {
    path: pathKeys.hud(),
    element: <HUDLayout />,
    children: [characterCreatorRoute, inventoryRoute],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
