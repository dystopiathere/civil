import { HeadBlendsEntity } from "types/civil";

export function setHeadBlend(data: Partial<HeadBlendsEntity>, cb: CallableFunction) {
  const headBlends = (globalThis.LocalPlayer).state.head_blends;

  Object.assign(headBlends, data);

  (globalThis.LocalPlayer).state.set("head_blends", headBlends, true);

  cb([{ status: true }, false]);
}
