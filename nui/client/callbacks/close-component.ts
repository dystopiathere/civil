import { openPage } from "../lib";

export function closeComponent(data: {}, cb: CallableFunction) {
  openPage("hud");

  cb([{ status: true }, false]);
}
