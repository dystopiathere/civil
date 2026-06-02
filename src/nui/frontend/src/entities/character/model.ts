import type {
  ComponentVariationsEntity,
  FaceFeaturesEntity,
  CharacterState,
  HeadBlendsEntity,
  HeadOverlaysEntity,
  SkillsEntity,
} from "@civil/types";
import { create, type StoreApi, type UseBoundStore } from "zustand";

type Actions = {
  setFaceFeatures: (faceFeatures: Partial<FaceFeaturesEntity>) => void;
  setSkills: (faceFeatures: Partial<SkillsEntity>) => void;
  setHeadOverlays: (faceFeatures: Partial<HeadOverlaysEntity>) => void;
  setComponentVariations: (faceFeatures: Partial<ComponentVariationsEntity>) => void;
  setHeadBlends: (headBlends: Partial<HeadBlendsEntity>) => void;
  setPlayerHealth: (health: number) => void;
  setPlayerMaxHealth: (maxHealth: number) => void;
  setPlayerArmour: (armour: number) => void;
  setPlayerMaxArmour: (maxArmour: number) => void;
  setPlayerBreath: (breath: number) => void;
  setPlayerInWater: (isInWater: boolean) => void;
};

type CharacterStoreState = Partial<CharacterState> & Actions;

export const useCharacterStore: UseBoundStore<StoreApi<CharacterStoreState>> = create((set) => ({
  health: 200,
  maxHealth: 200,
  armour: 25,
  maxArmour: 100,
  breath: 40,
  isInWater: true,
  faceFeatures: {
    id: 1,
    noseWidth: -1,
    nosePeak: 1,
    noseLength: 1,
    noseBoneCurveness: 1,
    noseTip: 1,
    noseBoneTwist: 1,
    eyebrowUpDown: 1,
    eyebrowInOut: 1,
    cheekBones: 1,
    cheekSidewaysBoneSize: 1,
    cheekBonesWidth: 1,
    eyeOpening: 1,
    lipThickness: 1,
    jawBoneWidth: 1,
    jawBoneShape: 1,
    chinBone: 1,
    chinBoneLength: 1,
    chinBoneShape: 1,
    chinHole: 1,
    neckThickness: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  skills: {
    id: 1,
    stamina: 1,
    strength: 1,
    lungCapacity: 1,
    wheelieAbility: 1,
    flyingAbility: 1,
    shootingAbility: 1,
    stealthAbility: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  headOverlays: {
    id: 1,
    blemishes: 1,
    blemishesOpacity: 1,
    facialHair: 1,
    facialHairColor: 1,
    facialHairSecondColor: 1,
    facialHairOpacity: 1,
    eyebrows: 1,
    eyebrowsColor: 1,
    eyebrowsSecondColor: 1,
    eyebrowsOpacity: 1,
    ageing: 1,
    ageingOpacity: 1,
    makeup: 1,
    makeupColor: 1,
    makeupSecondColor: 1,
    makeupOpacity: 1,
    blush: 1,
    blushColor: 1,
    blushSecondColor: 1,
    blushOpacity: 1,
    complexion: 1,
    complexionOpacity: 1,
    sunDamage: 1,
    sunDamageOpacity: 1,
    lipstick: 1,
    lipstickColor: 1,
    lipstickSecondColor: 1,
    lipstickOpacity: 1,
    molesFreckles: 1,
    molesFrecklesColor: 1,
    molesFrecklesSecondColor: 1,
    molesFrecklesOpacity: 1,
    chestHair: 1,
    chestHairColor: 1,
    chestHairSecondColor: 1,
    chestHairOpacity: 1,
    bodyBlemishes: 1,
    bodyBlemishesOpacity: 1,
    addBodyBlemishes: 1,
    addBodyBlemishesOpacity: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  componentVariations: {
    id: 1,
    faceDrawable: 1,
    faceTexture: 1,
    facePalette: 1,
    maskDrawable: 1,
    maskTexture: 1,
    maskPalette: 1,
    hairDrawable: 1,
    hairTexture: 1,
    hairPalette: 1,
    torsoDrawable: 1,
    torsoTexture: 1,
    torsoPalette: 1,
    legDrawable: 1,
    legTexture: 1,
    legPalette: 1,
    bagDrawable: 1,
    bagTexture: 1,
    bagPalette: 1,
    shoesDrawable: 1,
    shoesTexture: 1,
    shoesPalette: 1,
    accessoryDrawable: 1,
    accessoryTexture: 1,
    accessoryPalette: 1,
    undershirtDrawable: 1,
    undershirtTexture: 1,
    undershirtPalette: 1,
    kevlarDrawable: 1,
    kevlarTexture: 1,
    kevlarPalette: 1,
    badgeDrawable: 1,
    badgeTexture: 1,
    badgePalette: 1,
    torsoSecondDrawable: 1,
    torsoSecondTexture: 1,
    torsoSecondPalette: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  headBlends: {
    id: 1,
    shapeFirstId: 1,
    shapeSecondId: 1,
    shapeThirdId: 1,
    skinFirstId: 1,
    skinSecondId: 1,
    skinThirdId: 1,
    shapeMix: 1,
    skinMix: 1,
    thirdMix: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  setPlayerHealth: (health) => set({ health }),
  setPlayerMaxHealth: (maxHealth) => set({ maxHealth }),
  setPlayerArmour: (armour) => set({ armour }),
  setPlayerMaxArmour: (maxArmour) => set({ maxArmour }),
  setPlayerBreath: (breath) => set({ breath }),
  setPlayerInWater: (isInWater) => set({ isInWater }),

  setFaceFeatures: (data: Partial<FaceFeaturesEntity>) =>
    set((state) => {
      const faceFeatures = { ...state.faceFeatures };
      Object.assign(faceFeatures, data);
      const newState = { ...state };
      Object.assign(newState, { faceFeatures });

      return newState;
    }),
  setSkills: (data: Partial<SkillsEntity>) =>
    set((state) => {
      const skills = { ...state.skills };
      Object.assign(skills, data);
      const newState = { ...state };
      Object.assign(newState, { skills });

      return newState;
    }),
  setHeadOverlays: (data: Partial<HeadOverlaysEntity>) =>
    set((state) => {
      const headOverlays = { ...state.headOverlays };
      Object.assign(headOverlays, data);
      const newState = { ...state };
      Object.assign(newState, { headOverlays });

      return newState;
    }),
  setComponentVariations: (data: Partial<ComponentVariationsEntity>) =>
    set((state) => {
      const componentVariations = { ...state.componentVariations };
      Object.assign(componentVariations, data);
      const newState = { ...state };
      Object.assign(newState, { componentVariations });

      return newState;
    }),
  setHeadBlends: (data: Partial<HeadBlendsEntity>) =>
    set((state) => {
      const headBlends = { ...state.headBlends };
      Object.assign(headBlends, data);
      const newState = { ...state };
      Object.assign(newState, { headBlends });

      return newState;
    }),
}));
