export function coords(source: number, args: string[], raw: string) {
  const ped = PlayerPedId();

  console.log(...GetEntityCoords(ped, false));
}
