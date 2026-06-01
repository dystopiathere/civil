export function setHp(source: number, args: string[], raw: string) {
  (globalThis.LocalPlayer).state.set("health", Number(args[0]), true);
}
