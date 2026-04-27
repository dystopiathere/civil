export async function freeze(ped: number, state: boolean): Promise<void> {
  (global.LocalPlayer as LocalPlayerInterface).state.set("frozen", state, true);

  const animDict = "nm";
  RequestAnimDict(animDict);

  while (!HasAnimDictLoaded(animDict)) {
    await global.exports.civil_helpers.delay(100);
  }

  FreezeEntityPosition(ped, state);

  TaskPlayAnim(ped, animDict, "fireman_standing", 8.0, -8.0, -1, 1, 0, false, false, false);

  SetPedCanPlayAmbientIdles(ped, !state, !state);
  SetPedConfigFlag(ped, 292, state);
  SetPedConfigFlag(ped, 185, state);
}
