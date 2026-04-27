import { NuiPage } from "types/civil";
import { openPage } from "../lib";

RegisterNuiCallback("renavigate", (data: { page: NuiPage }, cb: CallableFunction) => {
  openPage(data.page);

  cb([{ status: true }, false]);
});
