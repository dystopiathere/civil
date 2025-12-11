RegisterCommand(
  "respawn",
  async (source: number, args: string[], raw: string) => {
    const playerPed = GetPlayerPed(-1);

    const [x, y, z] = GetEntityCoords(playerPed, true);

    NetworkResurrectLocalPlayer(x, y, z, GetEntityHeading(playerPed), 0, true);
    ClearPedBloodDamage(playerPed);

    global.LocalPlayer.state.set("health", 280, true);
  },
  false
);
