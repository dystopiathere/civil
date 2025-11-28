export type NUIResponse<R extends object> = [R | null, string | false];

export type Event =
  | 'getDrawablesCount'
  | 'getTexturesCount'
  | 'getHeadBlendData'
  | 'sendCharacterUpdates';

export type EventSend<D extends object, R extends object> = (data?: D) => Promise<NUIResponse<R> | false>;

export type Message =
  | 'setPlayerStats'
  | 'setPlayerUnderwater'
  | 'setWorldData'
  | 'setCharacterData'
  | 'navigate';

export type MessageEventData = {
  name: Message;
  data: never;
}