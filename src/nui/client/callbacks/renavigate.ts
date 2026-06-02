import { openPage } from "../lib";

export function renavigate(data: { page: string }, cb: CallableFunction) {
  openPage(data.page);

  cb([{ status: true }, false]);
}
