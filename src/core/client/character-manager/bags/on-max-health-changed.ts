export function onMaxHealthChanged(value: number) {
  const ped = GetPlayerPed(-1);

  SetEntityMaxHealth(ped, value);
  SetPedMaxHealth(ped, value);
}
