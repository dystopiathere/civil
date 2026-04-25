import { setModel } from "./set-model";
import { updateFreemodeModel } from "./update-freemode-model";

type Keys = "eye_color" | "head_blends" | "face_features" | "component_variations" | "head_overlays" | "model";

const keys: Keys[] = ["eye_color", "head_blends", "face_features", "component_variations", "head_overlays", "model"];

let stateBagHandler: number | undefined;

export function init() {
  if (stateBagHandler) {
    RemoveStateBagChangeHandler(stateBagHandler);
  }

  stateBagHandler = AddStateBagChangeHandler(
    "",
    `player:${GetPlayerServerId(PlayerId())}`,
    (bagName: string, key: Keys, value: LocalPlayerStateBagInterface[Keys]) => {
      if (!keys.includes(key)) {
        return;
      }

      const player = GetPlayerFromStateBagName(bagName);
      const ped = GetPlayerPed(player);

      if (key === "model") {
        value = value as string;
        setModel(ped, value);
      }

      updateFreemodeModel(ped);
    },
  );

  return () => {
    if (stateBagHandler) {
      RemoveStateBagChangeHandler(stateBagHandler);
      stateBagHandler = undefined;
    }
  };
}
