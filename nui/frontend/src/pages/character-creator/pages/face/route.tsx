import { createElement } from "react";
import type { RouteObject } from "react-router-dom";
import { pathKeys } from "~/shared/lib";
import { CharacterCreatorFace } from "./ui";

export const characterCreatorFaceRoute: RouteObject = {
  path: pathKeys.characterCreatorFace(),
  element: createElement(CharacterCreatorFace),
};
