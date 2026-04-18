import { NuiPage } from "types/civil";

export function navigate(page: NuiPage) {
  SendNuiMessage(
    JSON.stringify({
      name: "navigate",
      data: {
        page,
      },
    })
  );
}
