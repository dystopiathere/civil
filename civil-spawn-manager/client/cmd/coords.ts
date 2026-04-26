const exports = global.exports as CitizenExports;

RegisterCommand(
  "coords",
  async (source: number, args: string[], raw: string) => {
    const ped = GetPlayerPed(-1);

    console.log(...GetEntityCoords(ped, false));
  },
  false,
);

export {};
