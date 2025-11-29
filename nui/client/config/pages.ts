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
      const [pedPosX, pedPosY, pedPosZ] = GetEntityCoords(playerPed, true)
      const [pedRotX, pedRotY, pedRotZ] = GetEntityRotation(playerPed, 2)

      SetCamRot(camera, pedRotX - 5, pedRotY, pedRotZ - 180, 2)
      SetCamCoord(camera, pedPosX, pedPosY, pedPosZ + 0.5)
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