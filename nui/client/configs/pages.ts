import { NuiPageData } from "../types";

export const pages: Record<string, NuiPageData> = {
  hud: {
    focus: false,
    cursor: false,
    input: true,
    freeze: false,
  },
  characterCreator: {
    focus: true,
    cursor: true,
    input: false,
    freeze: false,
  },
  characterCreatorGenetics: {
    focus: true,
    cursor: true,
    input: false,
    freeze: true,
    setupCamera: () => {
      const camera = CreateCam("DEFAULT_SCRIPTED_CAMERA", true);

      const playerPed = GetPlayerPed(-1);
      const [pedRotX, pedRotY, pedRotZ] = GetEntityRotation(playerPed, 2);
      const [camPosX, camPosY, camPosZ] = GetOffsetFromEntityInWorldCoords(playerPed, -0.12, 0.75, 0.6);

      SetCamRot(camera, pedRotX - 7, pedRotY, pedRotZ + 165, 2);
      SetCamCoord(camera, camPosX, camPosY, camPosZ);
      SetCamFov(camera, 70);

      return camera;
    },
  },
  characterCreatorFace: {
    focus: true,
    cursor: true,
    input: false,
    freeze: true,
    setupCamera: () => {
      const camera = CreateCam("DEFAULT_SCRIPTED_CAMERA", true);

      const playerPed = GetPlayerPed(-1);
      const [pedRotX, pedRotY, pedRotZ] = GetEntityRotation(playerPed, 2);
      const [camPosX, camPosY, camPosZ] = GetOffsetFromEntityInWorldCoords(playerPed, -0.12, 0.75, 0.6);

      SetCamRot(camera, pedRotX - 7, pedRotY, pedRotZ + 165, 2);
      SetCamCoord(camera, camPosX, camPosY, camPosZ);
      SetCamFov(camera, 70);

      return camera;
    },
  },
  characterCreatorBody: {
    focus: true,
    cursor: true,
    input: false,
    freeze: true,
    setupCamera: () => {
      const camera = CreateCam("DEFAULT_SCRIPTED_CAMERA", true);

      const playerPed = GetPlayerPed(-1);
      const [pedRotX, pedRotY, pedRotZ] = GetEntityRotation(playerPed, 2);
      const [camPosX, camPosY, camPosZ] = GetOffsetFromEntityInWorldCoords(playerPed, -0.12, 0.75, 0.6);

      SetCamRot(camera, pedRotX - 7, pedRotY, pedRotZ + 165, 2);
      SetCamCoord(camera, camPosX, camPosY, camPosZ);
      SetCamFov(camera, 70);

      return camera;
    },
  },
  characterCreatorClothes: {
    focus: true,
    cursor: true,
    input: false,
    freeze: true,
    setupCamera: () => {
      const camera = CreateCam("DEFAULT_SCRIPTED_CAMERA", true);

      const playerPed = GetPlayerPed(-1);
      const [pedRotX, pedRotY, pedRotZ] = GetEntityRotation(playerPed, 2);
      const [camPosX, camPosY, camPosZ] = GetOffsetFromEntityInWorldCoords(playerPed, -0.12, 1.4, 0.18);

      SetCamRot(camera, pedRotX - 10, pedRotY, pedRotZ + 165, 2);
      SetCamCoord(camera, camPosX, camPosY, camPosZ);
      SetCamFov(camera, 70);

      return camera;
    },
  },
  inventory: {
    focus: true,
    cursor: true,
    input: false,
    freeze: true,
  },
};
