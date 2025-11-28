import { tempIdsMapping } from '../mappings'
import { CharacterModel, PlayerModel } from '../entities'

on('playerJoining', async (oldId: string) => {
  const playerSource = global.source

  const playerId = tempIdsMapping[oldId]

  const playerModel = new PlayerModel()
  const characterModel = new CharacterModel()

  let character = await playerModel.getActiveCharacter(playerId)

  if (!character) {
    const newCharacter = await characterModel.create()

    if (!newCharacter) {
      console.log('Can\'t create character')
      return
    }

    const assigned = await characterModel.assignToPlayer(newCharacter.id, playerId)

    if (!assigned) {
      console.log('Can\'t assign character to player')
      return
    }

    character = newCharacter
  }

  const fullCharacter = {
    ...character,
    head_blends: await characterModel.getHeadBlends(character.id),
    face_features: await characterModel.getFaceFeatures(character.id),
    skills: await characterModel.getSkills(character.id),
    component_variations: await characterModel.getComponentVariations(character.id),
    head_overlays: await characterModel.getHeadOverlays(character.id),
  }

  Player(playerSource).state.set('character', fullCharacter, true)
})
