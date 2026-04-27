import { delay } from "~/helpers";

export async function setModel(model: string) {
  if (!IsModelInCdimage(model) || !IsModelAPed(model)) {
    console.error(`Bad model: ${model}`);
  }

  if (GetEntityArchetypeName(GetPlayerPed(-1)) === model) {
    return;
  }

  RequestModel(model);

  while (!HasModelLoaded(model)) {
    await delay(500);
  }

  SetPlayerModel(PlayerId(), model);

  SetModelAsNoLongerNeeded(model);
}
