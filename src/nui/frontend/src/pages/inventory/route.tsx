import type { RouteObject } from "react-router-dom";
import { pathKeys } from "~/shared/lib/react-router";
import { createElement } from "react";
import { Inventory } from "./ui";

export const inventoryRoute: RouteObject = {
  path: pathKeys.inventory(),
  element: createElement(Inventory),
};
