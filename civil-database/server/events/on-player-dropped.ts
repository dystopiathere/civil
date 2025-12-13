import dayjs from "dayjs";
import { CharacterEntity } from "civil";
import {
  CharacterModel,
  ComponentVariationsModel,
  FaceFeaturesModel,
  HeadBlendsModel,
  HeadOverlaysModel,
  SkillsModel,
} from "../entities";

// @ts-ignore
const exports = global.exports as CivilExports;

async function syncData(state: Omit<LocalPlayerStateBagInterface, "set">) {
  const now = dayjs().toISOString();

  const characterModel = new CharacterModel();
  const headBlendsModel = new HeadBlendsModel();
  const faceFeaturesModel = new FaceFeaturesModel();
  const skillsModel = new SkillsModel();
  const componentVariationsModel = new ComponentVariationsModel();
  const headOverlaysModel = new HeadOverlaysModel();

  const headBlends = await characterModel.getHeadBlends(state.character_id);
  const faceFeatures = await characterModel.getFaceFeatures(state.character_id);
  const skills = await characterModel.getSkills(state.character_id);
  const componentVariations = await characterModel.getComponentVariations(state.character_id);
  const headOverlays = await characterModel.getHeadOverlays(state.character_id);

  await headBlendsModel.update(headBlends.id, { ...state.head_blends, updated_at: now });
  await faceFeaturesModel.update(faceFeatures.id, { ...state.face_features, updated_at: now });
  await skillsModel.update(skills.id, { ...state.skills });
  await componentVariationsModel.update(componentVariations.id, { ...state.component_variations, updated_at: now });
  await headOverlaysModel.update(headOverlays.id, { ...state.head_overlays, updated_at: now });

  const character: Partial<CharacterEntity> = {
    firstname: state.firstname,
    lastname: state.lastname,
    age: state.age,
    sex: state.sex,
    health: state.health,
    max_health: state.max_health,
    armour: state.armour,
    max_armour: state.max_armour,
    eye_color: state.eye_color,
    hair_first_color: state.hair_first_color,
    last_position: state.last_position,
    model: state.model,
    updated_at: now,
  };

  await characterModel.update(state.character_id, character);
}

on("playerDropped", async (reason: string, resourceName: string, clientDropReason: number) => {
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
    stamina: localPlayer.state.stamina,
    strength: localPlayer.state.strength,
    lung_capacity: localPlayer.state.lung_capacity,
    wheelie_ability: localPlayer.state.wheelie_ability,
    flying_ability: localPlayer.state.flying_ability,
    shooting_ability: localPlayer.state.shooting_ability,
    stealth_ability: localPlayer.state.stealth_ability,
  };

  await syncData(data);
});

exports("syncData", syncData);
