import type { RouteObject } from "react-router-dom";
import { createElement } from "react";
import { pathKeys } from "~/shared/lib";
import { CharacterCreatorClothes } from "./ui";

export const characterCreatorClothesRoute: RouteObject = {
  path: pathKeys.characterCreatorClothes(),
  element: createElement(CharacterCreatorClothes),
};
