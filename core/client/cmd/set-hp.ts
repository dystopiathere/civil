export function setHp(source: number, args: string[], raw: string) {
  (global.LocalPlayer as LocalPlayerInterface).state.set("health", Number(args[0]), true);
}
