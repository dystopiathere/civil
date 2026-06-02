import { ComponentVariationsEntity } from "@civil/types";
import { TypedLocalPlayer } from "../lib/typed-local-player";

export function setComponentVariation(data: Partial<ComponentVariationsEntity>, cb: CallableFunction) {
  const player = TypedLocalPlayer();

  const componentVariations = { ...player.state.componentVariations };
  Object.assign(componentVariations, data);

  player.state.set("componentVariations", componentVariations, true);

  cb([{ status: true }, false]);
}
