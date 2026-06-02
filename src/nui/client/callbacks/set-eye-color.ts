import { TypedLocalPlayer } from "../lib/typed-local-player";

export function setEyeColor(data: number, cb: CallableFunction) {
  TypedLocalPlayer().state.set("eyeColor", data, true);

  cb([{ status: true }, false]);
}
