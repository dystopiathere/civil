// @ts-ignore
const exports = global.exports as CivilExports;

let timeoutId: NodeJS.Timeout;

RegisterCommand(
  "revive",
  async (source: number, args: string[], raw: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const playerPed = GetPlayerPed(-1);

    const [x, y, z] = GetEntityCoords(playerPed, true);

    NetworkResurrectLocalPlayer(x, y, z, GetEntityHeading(playerPed), 0, true);

    const delay = await exports.civil_animations.playAnimationChain(playerPed, "reviveVictim");

    timeoutId = setTimeout(() => {
      global.LocalPlayer.state.set("health", 180, true);
    }, delay);
  },
  false
);
