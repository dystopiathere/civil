import { TypedLocalPlayer } from "~/helpers";

export function setHp(source: number, args: string[], raw: string) {
  TypedLocalPlayer().state.set("health", Number(args[0]), true);
}
