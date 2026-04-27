export type NUIResponse<R extends object> = [R | null, string | false];

export type Event =
  | "getDrawablesList"
  | "getTexturesList"
  | "getModel"
  | "setModel"
  | "getHeadBlend"
  | "setHeadBlend"
  | "getComponentVariation"
  | "setComponentVariation"
  | "getFaceFeature"
  | "setFaceFeature"
  | "getHeadOverlay"
  | "setHeadOverlay"
  | "getEyeColor"
  | "setEyeColor"
  | "renavigate"
  | "closeComponent";

export type EventSend<D extends object, R extends object> = (data?: D) => Promise<NUIResponse<R> | false>;

export type Message =
  | "setPlayerHealth"
  | "setPlayerMaxHealth"
  | "setPlayerArmour"
  | "setPlayerMaxArmour"
  | "setPlayerUnderwater"
  | "setWorldData"
  | "setCharacterData"
  | "navigate"
  | "setSafeZone";

export type MessageEventData = {
  name: Message;
  data: never;
};
