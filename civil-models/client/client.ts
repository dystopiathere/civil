import {
  HeadBlends,
  FaceFeatures,
  ComponentVariations,
  HeadOverlays
} from 'civil'
import {
  setModel,
  setPedHeadBlendData,
  setPedHeadOverlayData,
  setPedComponentVariationData,
  setPedFaceFeatureData,
  updateFreemodeModel
} from './lib'

AddStateBagChangeHandler('eye_color', null, (bagName: string, key: string, value: number) => {
  const ped = GetEntityFromStateBagName(bagName)

  SetPedEyeColor(ped, value)
})

AddStateBagChangeHandler('head_blends', null, (bagName: string, key: string, value: HeadBlends) => {
  const ped = GetEntityFromStateBagName(bagName)

  setPedHeadBlendData(ped, value)
})

AddStateBagChangeHandler('face_features', null, (bagName: string, key: string, value: FaceFeatures) => {
  const ped = GetEntityFromStateBagName(bagName)

  setPedFaceFeatureData(ped, value)
})

AddStateBagChangeHandler('component_variations', null, (bagName: string, key: string, value: ComponentVariations) => {
  const ped = GetEntityFromStateBagName(bagName)

  setPedComponentVariationData(ped, value)
})

AddStateBagChangeHandler('head_overlays', null, (bagName: string, key: string, value: HeadOverlays) => {
  const ped = GetEntityFromStateBagName(bagName)

  setPedHeadOverlayData(ped, value)
})

on('playerSpawned', async () => {
  updateFreemodeModel(GetPlayerPed(-1))
})

// EXPORT LIB
global.exports('setModel', setModel)
global.exports('setPedHeadBlendData', setPedHeadBlendData)
global.exports('setPedHeadOverlayData', setPedHeadOverlayData)
global.exports('setPedComponentVariationData', setPedComponentVariationData)
global.exports('setPedFaceFeatureData', setPedFaceFeatureData)
global.exports('updateFreemodeModel', updateFreemodeModel)