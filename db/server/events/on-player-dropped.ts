import { syncData } from "../lib";

export async function onPlayerDropped(reason: string, resourceName: string, clientDropReason: number) {
  const localPlayer = Player(global.source) as LocalPlayerInterface;

  console.log(`Player ${localPlayer.state.player_id} dropped with reason: ${reason} (Code ${clientDropReason})`);

  const data: Omit<LocalPlayerStateBagInterface, "set"> = {
    player_id: localPlayer.state.player_id,
    character_id: localPlayer.state.character_id,
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
    stamina: localPlayer.state.stamina,
    strength: localPlayer.state.strength,
    lung_capacity: localPlayer.state.lung_capacity,
    wheelie_ability: localPlayer.state.wheelie_ability,
    flying_ability: localPlayer.state.flying_ability,
    shooting_ability: localPlayer.state.shooting_ability,
    stealth_ability: localPlayer.state.stealth_ability,
  };

  await syncData(data);
}
