import { TypedLocalPlayer } from "../lib/typed-local-player";

export function getModel(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.model, false]);
}
