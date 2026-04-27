import { registerStateBag } from "~/helpers";
import { registerEvents } from "./lib";
import { Key } from "./types";
import { KEYS, stateBagHandlers } from "./configs";

const bagFilter = `player:${GetPlayerServerId(PlayerId())}`;
registerStateBag<Key>("", bagFilter, KEYS, stateBagHandlers);
registerEvents();
