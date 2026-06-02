import { entityToCharacterState } from "@civil/typed-helpers";
import { TypedPlayer } from "@civil/typed-helpers/server";
import { prepareCharacterDto, syncData } from "../lib";

export async function onPlayerDropped(reason: string, _: string, clientDropReason: number) {
  const player = TypedPlayer(global.source);

  console.log(`Player ${player.state.playerId} dropped with reason: ${reason} (Code ${clientDropReason})`);

  const characterState = entityToCharacterState(player);
  const characterDto = prepareCharacterDto(characterState);

  await syncData(player.state.id, characterDto);
}
