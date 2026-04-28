import { openPage } from "./open-page";

export function registerEvents() {
  on("nui:openPage", openPage);
}
