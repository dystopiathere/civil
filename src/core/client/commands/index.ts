import { blackout, car, coords, respawn, revive, setHp, setTime, weapons } from "./lib";

const commands = { blackout, car, coords, respawn, revive, setHp, setTime, weapons };

export function init() {
  Object.entries(commands).forEach(([command, handler]) => {
    RegisterCommand(command, handler, false);
  });
}
