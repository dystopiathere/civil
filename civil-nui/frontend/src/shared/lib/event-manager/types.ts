export type NUIResponse<R extends object> = [R | null, string | false];

export type Event =
  | 'getDrawablesCount'
  | 'getTexturesCount'
  | 'getModel'
  | 'setModel'
  | 'getHeadBlendData'
  | 'setHeadBlend'
  | 'getComponentVariation'
  | 'setComponentVariation'
  | 'getFaceFeature'
  | 'setFaceFeature'
  | 'getHeadOverlay'
  | 'setHeadOverlay'
  | 'closeComponent';

export type EventSend<D extends object, R extends object> = (data?: D) => Promise<NUIResponse<R> | false>;

export type Message =
  | 'setPlayerHealth'
  | 'setPlayerMaxHealth'
  | 'setPlayerArmour'
  | 'setPlayerMaxArmour'
  | 'setPlayerUnderwater'
  | 'setWorldData'
  | 'setCharacterData'
  | 'navigate';

export type MessageEventData = {
  name: Message;
  data: never;
}