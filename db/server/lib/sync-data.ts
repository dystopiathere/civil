import dayjs from "dayjs";
import {
  CharacterModel,
  ComponentVariationsModel,
  FaceFeaturesModel,
  HeadBlendsModel,
  HeadOverlaysModel,
  SkillsModel,
} from "../entities";
import { CharacterEntity } from "types/civil";

export async function syncData(state: Omit<LocalPlayerStateBagInterface, "set">) {
  const now = dayjs().toISOString();

  const characterModel = new CharacterModel();

  const characterDataFunctions = {
    headBlends: {
      get: (id: number) => characterModel.getHeadBlends(id),
      update: (id: number) => new HeadBlendsModel().update(id, { ...state.head_blends, updated_at: now }),
    },
    faceFeatures: {
      get: (id: number) => characterModel.getFaceFeatures(id),
      update: (id: number) => new FaceFeaturesModel().update(id, { ...state.face_features, updated_at: now }),
    },
    skills: {
      get: (id: number) => characterModel.getSkills(id),
      update: (id: number) => new SkillsModel().update(id, { ...state.skills }),
    },
    componentVariations: {
      get: (id: number) => characterModel.getComponentVariations(id),
      update: (id: number) =>
        new ComponentVariationsModel().update(id, { ...state.component_variations, updated_at: now }),
    },
    headOverlays: {
      get: (id: number) => characterModel.getHeadOverlays(id),
      update: (id: number) => new HeadOverlaysModel().update(id, { ...state.head_overlays, updated_at: now }),
    },
  };

  const promises = Object.entries(characterDataFunctions).map(([_, { get, update }]) => {
    return (async () => {
      const data = await get(state.character_id);

      if (data) {
        await update(data.id);
      }
    })();
  });

  await Promise.all(promises);

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
    knockdown: state.knockdown,
    updated_at: now,
  };

  await characterModel.update(state.character_id, character);
}
