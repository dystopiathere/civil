import { TypedLocalPlayer } from "../lib/typed-local-player";

export function setModel(data: string, cb: CallableFunction) {
  TypedLocalPlayer().state.set("model", data, true);

  cb([{ status: true }, false]);
}
