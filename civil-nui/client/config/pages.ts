import { NuiPage, NuiPageData } from 'civil'

export const pages: Record<NuiPage, NuiPageData> = {
  hud: {
    focus: false,
    cursor: false,
    input: true,
  },
  characterCreator: {
    focus: true,
    cursor: true,
    input: false,
  },
  characterCreatorGenetics: {
    focus: true,
    cursor: true,
    input: false,
    setupCamera: () => {
      const camera = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)

      const playerPed = GetPlayerPed(-1)
      const [pedRotX, pedRotY, pedRotZ] = GetEntityRotation(playerPed, 2)
      const [camPosX, camPosY, camPosZ] = GetOffsetFromEntityInWorldCoords(playerPed, -0.12, 0.75, 0.6)

      SetCamRot(camera, pedRotX - 7, pedRotY, pedRotZ + 165, 2)
      SetCamCoord(camera, camPosX, camPosY, camPosZ)
      SetCamFov(camera, 70)

      return camera
    },
  },
  characterCreatorFace: {
    focus: true,
    cursor: true,
    input: false,
  },
  characterCreatorBody: {
    focus: true,
    cursor: true,
    input: false,
  },
  characterCreatorClothes: {
    focus: true,
    cursor: true,
    input: false,
  },
}