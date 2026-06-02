import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function setEyeColor(data: number, cb: CallableFunction) {
  TypedLocalPlayer().state.set("eyeColor", data, true);

  cb([{ status: true }, false]);
}
