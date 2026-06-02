import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function getComponentVariation(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.componentVariations, false]);
}
