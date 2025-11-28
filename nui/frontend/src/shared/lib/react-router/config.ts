export const pathKeys = {
  root: import.meta.env.DEV ? '/' : '/dist/index.html/',
  hud () {
    return this.root
  },
  characterCreator () {
    return this.root.concat('characterCreator/')
  },
  characterCreatorGenetics () {
    return this.characterCreator().concat('genetics/')
  },
  characterCreatorFace () {
    return this.characterCreator().concat('face/')
  },
  characterCreatorBody () {
    return this.characterCreator().concat('body/')
  },
  characterCreatorClothes () {
    return this.characterCreator().concat('clothes/')
  }
}