import { FullCharacterDto } from "types/civil";
import { syncData } from "../lib";

export async function onPlayerDropped(reason: string, _: string, clientDropReason: number) {
  const localPlayer = Player(global.source) as LocalPlayerInterface;

  console.log(`Player ${localPlayer.state.player_id} dropped with reason: ${reason} (Code ${clientDropReason})`);

  const data: FullCharacterDto = {
    id: localPlayer.state.id,
    firstname: localPlayer.state.firstname,
    lastname: localPlayer.state.lastname,
    age: localPlayer.state.age,
    sex: localPlayer.state.sex,
    health: localPlayer.state.health,
    max_health: localPlayer.state.max_health,
    armour: localPlayer.state.armour,
    max_armour: localPlayer.state.max_armour,
    eye_color: localPlayer.state.eye_color,
    hair_first_color: localPlayer.state.hair_first_color,
    head_blends: localPlayer.state.head_blends,
    face_features: localPlayer.state.face_features,
    skills: localPlayer.state.skills,
    component_variations: localPlayer.state.component_variations,
    head_overlays: localPlayer.state.head_overlays,
    last_position: localPlayer.state.last_position,
    model: localPlayer.state.model,
    knockdown: localPlayer.state.knockdown,
  };

  await syncData(data);
}
