export function onMaxHealthChanged(value: number) {
  const ped = PlayerPedId();

  SetEntityMaxHealth(ped, value);
  SetPedMaxHealth(ped, value);
}
