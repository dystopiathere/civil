import { HeadOverlaysEntity } from "@civil/types";
import { TypedLocalPlayer } from "../lib/typed-local-player";

export function setHeadOverlay(data: Partial<HeadOverlaysEntity>, cb: CallableFunction) {
  const player = TypedLocalPlayer();

  const headOverlays = { ...player.state.headOverlays };
  Object.assign(headOverlays, data);

  player.state.set("headOverlays", headOverlays, true);

  cb([{ status: true }, false]);
}
