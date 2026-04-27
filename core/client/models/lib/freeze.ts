import { delay } from "~/helpers";

export async function freeze(state: boolean): Promise<void> {
  const localPlayer = global.LocalPlayer;

  localPlayer.state.set("frozen", state, true);

  const ped = GetPlayerPed(-1);

  const animDict = "nm";
  RequestAnimDict(animDict);

  while (!HasAnimDictLoaded(animDict)) {
    await delay(100);
  }

  FreezeEntityPosition(ped, state);

  TaskPlayAnim(ped, animDict, "fireman_standing", 8.0, -8.0, -1, 1, 0, false, false, false);

  SetPedCanPlayAmbientIdles(ped, !state, !state);
  SetPedConfigFlag(ped, 292, state);
  SetPedConfigFlag(ped, 185, state);
}
