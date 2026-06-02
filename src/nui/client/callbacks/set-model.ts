import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function setModel(data: string, cb: CallableFunction) {
  TypedLocalPlayer().state.set("model", data, true);

  cb([{ status: true }, false]);
}
