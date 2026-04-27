export function weapons() {
  const playerPed = GetPlayerPed(-1);

  const guns = [
    "WEAPON_MINIGUN",
    "WEAPON_HEAVYSHOTGUN",
    "WEAPON_PRECISIONRIFLE",
    "WEAPON_REVOLVER_MK2",
    "WEAPON_ASSAULTSMG",
    "WEAPON_BAT",
    "WEAPON_ASSAULTRIFLE_MK2",
  ];

  guns.forEach((gun) => {
    GiveWeaponToPed(playerPed, gun, 99999, false, false);
  });
}
