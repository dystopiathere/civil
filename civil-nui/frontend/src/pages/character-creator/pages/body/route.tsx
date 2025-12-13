import type { RouteObject } from "react-router-dom";
import { pathKeys } from "~/shared/lib/react-router";
import { createElement } from "react";
import { CharacterCreatorBody } from "./ui";

export const characterCreatorBodyRoute: RouteObject = {
  path: pathKeys.characterCreatorBody(),
  element: createElement(CharacterCreatorBody),
};
