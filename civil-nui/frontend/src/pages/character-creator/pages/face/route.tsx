import type { RouteObject } from "react-router-dom";
import { pathKeys } from "~/shared/lib/react-router";
import { createElement } from "react";
import { CharacterCreatorFace } from "./ui";

export const characterCreatorFaceRoute: RouteObject = {
  path: pathKeys.characterCreatorFace(),
  element: createElement(CharacterCreatorFace),
};
