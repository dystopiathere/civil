import type { RouteObject } from "react-router-dom";
import { pathKeys } from "~/shared/lib/react-router";
import { createElement } from "react";
import { CharacterCreatorClothes } from "./ui";

export const characterCreatorClothesRoute: RouteObject = {
  path: pathKeys.characterCreatorClothes(),
  element: createElement(CharacterCreatorClothes),
};
