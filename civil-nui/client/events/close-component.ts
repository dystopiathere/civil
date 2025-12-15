import { openPage } from "../lib";

RegisterNuiCallback("closeComponent", (data: {}, cb: CallableFunction) => {
  openPage("hud");

  cb([{ status: true }, false]);
});
