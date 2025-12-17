RegisterCommand(
  "test-hp",
  async (source: number, args: string[], raw: string) => {
    const ped = GetPlayerPed(-1);

    SetEntityMaxHealth(ped, 500);
    SetPedMaxHealth(ped, 500);
    SetEntityHealth(ped, 500);

    console.log(GetEntityMaxHealth(ped));
    console.log(GetEntityHealth(ped));
  },
  false
);

RegisterCommand(
  "test-check",
  async (source: number, args: string[], raw: string) => {
    const ped = GetPlayerPed(-1);

    console.log(GetEntityMaxHealth(ped));
    console.log(GetEntityHealth(ped));
  },
  false
);

export {};
