import { HeadBlends } from "types/civil";

RegisterNuiCallback("setHeadBlend", (data: Partial<HeadBlends>, cb: CallableFunction) => {
  const headBlends = (global.LocalPlayer as LocalPlayerInterface).state.head_blends;

  Object.assign(headBlends, data);

  (global.LocalPlayer as LocalPlayerInterface).state.set("head_blends", headBlends, true);

  cb([{ status: true }, false]);
});
