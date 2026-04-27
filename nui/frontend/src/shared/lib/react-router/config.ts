export const pathKeys = {
  root: import.meta.env.DEV ? "/" : "/dist/index.html/",
  hud() {
    return pathKeys.root;
  },
  characterCreator() {
    return pathKeys.root.concat("characterCreator/");
  },
  characterCreatorGenetics() {
    return pathKeys.characterCreator().concat("genetics/");
  },
  characterCreatorFace() {
    return pathKeys.characterCreator().concat("face/");
  },
  characterCreatorBody() {
    return pathKeys.characterCreator().concat("body/");
  },
  characterCreatorClothes() {
    return pathKeys.characterCreator().concat("clothes/");
  },
  inventory() {
    return pathKeys.root.concat("inventory/");
  },
};
