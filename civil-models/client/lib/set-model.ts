// @ts-ignore
const exports = global.exports as CivilExports;

export async function setModel(player: number, model: string) {
  if (!IsModelInCdimage(model) || !IsModelAPed(model)) {
    console.log(`Bad model: ${model}`);
  }

  const currentModel = GetEntityArchetypeName(GetPlayerPed(player));

  if (currentModel === model) {
    return;
  }

  RequestModel(model);

  while (!HasModelLoaded(model)) {
    await exports.civil_helpers.delay(500);
  }

  SetPlayerModel(player, model);

  SetModelAsNoLongerNeeded(model);
}
