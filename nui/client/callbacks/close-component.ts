import { openPage } from "../lib";

export function closeComponent(_: {}, cb: CallableFunction) {
  openPage("hud");

  cb([{ status: true }, false]);
}
