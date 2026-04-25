const exports = global.exports as CitizenExports;

RegisterCommand(
  "revive",
  async (source: number, args: string[], raw: string) => {
    const playerPed = GetPlayerPed(-1);

    const [x, y, z] = GetEntityCoords(playerPed, true);

    NetworkResurrectLocalPlayer(x, y, z, GetEntityHeading(playerPed), 0, true);

    await exports.civil_animations.playAnimationChain(playerPed, "reviveVictim");

    (global.LocalPlayer as LocalPlayerInterface).state.set("health", 180, true);
  },
  false,
);

export {};
