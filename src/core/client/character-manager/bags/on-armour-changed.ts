export function onArmourChanged(value: number) {
  const ped = PlayerPedId();

  SetPedArmour(ped, value);
}
