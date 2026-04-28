import { createElement } from "react";
import type { RouteObject } from "react-router-dom";
import { pathKeys } from "~/shared/lib";
import { CharacterCreator } from "./ui";
import {
  characterCreatorBodyRoute,
  characterCreatorClothesRoute,
  characterCreatorFaceRoute,
  characterCreatorGeneticsRoute,
} from "./pages";

export const characterCreatorRoute: RouteObject = {
  path: pathKeys.characterCreator(),
  element: createElement(CharacterCreator),
  children: [
    characterCreatorGeneticsRoute,
    characterCreatorBodyRoute,
    characterCreatorFaceRoute,
    characterCreatorClothesRoute,
  ],
};
