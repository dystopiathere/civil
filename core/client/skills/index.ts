import { registerStateBag } from "~/helpers";
import { registerEvents } from "./lib";
import { Key } from "./types";
import { KEYS, stateBagHandlers } from "./configs";

export function init() {
  registerStateBag<Key>("", `player:${GetPlayerServerId(PlayerId())}`, KEYS, stateBagHandlers);
  registerEvents();
}
