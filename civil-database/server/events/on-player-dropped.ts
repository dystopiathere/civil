import { FullCharacterEntity } from 'civil'
import {
  CharacterModel,
  ComponentVariationsModel,
  FaceFeaturesModel,
  HeadBlendsModel,
  HeadOverlaysModel,
  SkillsModel
} from '../entities'

const exports = global.exports as CitizenExports

async function syncData (character: FullCharacterEntity) {
  const characterModel = new CharacterModel()
  const headBlendsModel = new HeadBlendsModel()
  const faceFeaturesModel = new FaceFeaturesModel()
  const skillsModel = new SkillsModel()
  const componentVariationsModel = new ComponentVariationsModel()
  const headOverlaysModel = new HeadOverlaysModel()

  const headBlends = character.head_blends
  const faceFeatures = character.face_features
  const skills = character.skills
  const componentVariations = character.component_variations
  const headOverlays = character.head_overlays

  delete headBlends.created_at
  delete headBlends.updated_at
  delete faceFeatures.created_at
  delete faceFeatures.updated_at
  delete componentVariations.created_at
  delete componentVariations.updated_at
  delete headOverlays.created_at
  delete headOverlays.updated_at

  await headBlendsModel.update(headBlends.id, headBlends)
  await faceFeaturesModel.update(faceFeatures.id, faceFeatures)
  await skillsModel.update(skills.id, skills)
  await componentVariationsModel.update(componentVariations.id, componentVariations)
  await headOverlaysModel.update(headOverlays.id, headOverlays)

  delete character.head_blends
  delete character.face_features
  delete character.skills
  delete character.component_variations
  delete character.head_overlays
  delete character.created_at
  delete character.updated_at

  await characterModel.update(character.id, character)
}

on('playerDropped', async (reason: string, resourceName: string, clientDropReason: number) => {
  const { character } = Player(global.source).state as StateBagInterface & { character: FullCharacterEntity }

  console.log(`Character ${character.id} dropped with reason: ${reason}`)

  await syncData(character)
})

exports('syncData', syncData)
