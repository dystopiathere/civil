import { TypedLocalPlayer } from "../lib/typed-local-player";

export function getComponentVariation(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.componentVariations, false]);
}
