import { CharacterEntity } from 'civil'
import { delay } from '../utils'

export async function setPlayerModel ({ model }: Partial<CharacterEntity>) {
  if (!IsModelInCdimage(model) || !IsModelAPed(model)) {
    console.log(`[playermanager] Bad model: ${model}`)
  }

  const currentModel = GetEntityArchetypeName(GetPlayerPed(-1))

  console.log(currentModel, model)

  if (currentModel === model) {
    return
  }

  RequestModel(model)
  while (!HasModelLoaded(model)) {
    await delay(500)
  }

  SetPlayerModel(PlayerId(), model)

  SetModelAsNoLongerNeeded(model)
}