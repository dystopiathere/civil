import { createElement } from "react";
import type { RouteObject } from "react-router-dom";
import { pathKeys } from "~/shared/lib";
import { CharacterCreatorGenetics } from "./ui";

export const characterCreatorGeneticsRoute: RouteObject = {
  path: pathKeys.characterCreatorGenetics(),
  element: createElement(CharacterCreatorGenetics),
};
