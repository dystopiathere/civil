import { NuiPage } from "types/civil";
import { openPage } from "../lib";

export function renavigate(data: { page: NuiPage }, cb: CallableFunction) {
  openPage(data.page);

  cb([{ status: true }, false]);
}
