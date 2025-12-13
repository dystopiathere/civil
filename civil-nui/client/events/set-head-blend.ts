import { HeadBlends } from "civil";

RegisterNuiCallback("setHeadBlend", (data: Partial<HeadBlends>, cb: CallableFunction) => {
  const headBlends = global.LocalPlayer.state.head_blends;

  Object.assign(headBlends, data);

  global.LocalPlayer.state.set("head_blends", headBlends, true);

  cb([{ status: true }, false]);
});
