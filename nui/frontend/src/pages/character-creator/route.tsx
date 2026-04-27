import type { RouteObject } from "react-router-dom";
import { pathKeys } from "~/shared/lib/react-router";
import { createElement } from "react";
import { CharacterCreator } from "./ui";
import {
  characterCreatorBodyRoute,
  characterCreatorClothesRoute,
  characterCreatorFaceRoute,
  characterCreatorGeneticsRoute,
} from "~/pages/character-creator/pages";

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
