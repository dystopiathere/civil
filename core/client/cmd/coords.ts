export function coords(source: number, args: string[], raw: string) {
  const ped = GetPlayerPed(-1);

  console.log(...GetEntityCoords(ped, false));
}
