import { createElement } from "react";
import type { RouteObject } from "react-router-dom";
import { pathKeys } from "~/shared/lib";
import { CharacterCreatorBody } from "./ui";

export const characterCreatorBodyRoute: RouteObject = {
  path: pathKeys.characterCreatorBody(),
  element: createElement(CharacterCreatorBody),
};
