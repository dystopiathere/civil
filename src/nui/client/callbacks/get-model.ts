import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function getModel(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.model, false]);
}
