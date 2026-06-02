import { HeadBlendsEntity } from "@civil/types";
import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function setHeadBlend(data: Partial<HeadBlendsEntity>, cb: CallableFunction) {
  const player = TypedLocalPlayer();

  const headBlends = { ...player.state.headBlends };
  Object.assign(headBlends, data);

  player.state.set("headBlends", headBlends, true);

  cb([{ status: true }, false]);
}
