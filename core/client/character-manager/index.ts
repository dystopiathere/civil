import { registerStateBag } from "~/helpers";
import { registerEvents } from "./lib";
import { KEYS, stateBagHandlers } from "./configs";
import { Key } from "./types";

registerEvents();
registerStateBag<Key>("", `player:${GetPlayerServerId(PlayerId())}`, KEYS, stateBagHandlers);

DisableIdleCamera(false);
