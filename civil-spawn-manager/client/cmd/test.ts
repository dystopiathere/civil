const exports = global.exports as CitizenExports;

RegisterCommand(
  "test",
  async (source: number, args: string[], raw: string) => {
    const ped = GetPlayerPed(-1);
  },
  false
);

export {};
