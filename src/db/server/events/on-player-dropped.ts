import { CharacterState } from "@civil/types";
import { syncData, TypedPlayer } from "../lib";

export async function onPlayerDropped(reason: string, _: string, clientDropReason: number) {
  const localPlayer = TypedPlayer(global.source);

  console.log(`Player ${localPlayer.state.player_id} dropped with reason: ${reason} (Code ${clientDropReason})`);

  const data: Partial<CharacterState> = {
    id: localPlayer.state.id,
    firstname: localPlayer.state.firstname,
    lastname: localPlayer.state.lastname,
    age: localPlayer.state.age,
    sex: localPlayer.state.sex,
    health: localPlayer.state.health,
    maxHealth: localPlayer.state.maxHealth,
    armour: localPlayer.state.armour,
    maxArmour: localPlayer.state.maxArmour,
    eyeColor: localPlayer.state.eyeColor,
    hairFirstColor: localPlayer.state.hairFirstColor,
    headBlends: localPlayer.state.headBlends,
    faceFeatures: localPlayer.state.faceFeatures,
    skills: localPlayer.state.skills,
    componentVariations: localPlayer.state.componentVariations,
    headOverlays: localPlayer.state.headOverlays,
    lastPosition: localPlayer.state.lastPosition,
    model: localPlayer.state.model,
    knockdown: localPlayer.state.knockdown,
  };

  await syncData(data);
}
