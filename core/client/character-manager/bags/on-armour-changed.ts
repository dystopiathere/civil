export function onArmourChanged(value: number) {
  const ped = GetPlayerPed(-1);

  SetPedArmour(ped, value);
}
