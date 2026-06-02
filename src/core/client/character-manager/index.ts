import { registerStateBag } from "~/helpers";
import { collectPedPosition, registerEvents } from "./lib";
import { KEYS, stateBagHandlers } from "./configs";
import { Key } from "./types";

export function init() {
  collectPedPosition();

  registerEvents();
  registerStateBag<Key>("", `player:${GetPlayerServerId(PlayerId())}`, KEYS, stateBagHandlers);
}
