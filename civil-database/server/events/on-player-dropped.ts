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

async function syncData(state: LocalPlayerStateBagInterface) {
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

  console.log(headBlends.id, faceFeatures.id, skills.id, componentVariations.id, headOverlays.id);

  await headBlendsModel.update(headBlends.id, { ...state.head_blends, updated_at: now });
  await faceFeaturesModel.update(faceFeatures.id, { ...state.face_features, updated_at: now });
  await skillsModel.update(skills.id, { ...state.skills, updated_at: now });
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
  const { state } = Player(global.source) as LocalPlayerInterface;

  console.log(`Player ${state.player_id} dropped with reason: ${reason} (Code ${clientDropReason})`);

  await syncData(state);
});

exports("syncData", syncData);
