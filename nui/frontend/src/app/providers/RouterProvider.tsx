import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HUDLayout } from "~/pages/layouts";
import { pathKeys } from "~/shared/lib/react-router";
import { characterCreatorRoute } from "~/pages/character-creator";
import { inventoryRoute } from "~/pages/inventory";

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
