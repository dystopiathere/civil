import { pathKeys } from "~/shared/lib";

export const characterCreatorPages: { name: string; path: string }[] = [
  { name: "Генетика", path: pathKeys.characterCreatorGenetics() },
  { name: "Лицо", path: pathKeys.characterCreatorFace() },
  { name: "Тело", path: pathKeys.characterCreatorBody() },
  { name: "Одежда", path: pathKeys.characterCreatorClothes() },
];
