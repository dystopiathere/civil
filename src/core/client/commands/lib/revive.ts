import { TypedLocalPlayer } from "~/helpers";

export function revive(source: number, args: string[], raw: string) {
  const player = TypedLocalPlayer();

  player.state.set("health", player.state.maxHealth, true);
  player.state.set("knockdown", false, true);
}
