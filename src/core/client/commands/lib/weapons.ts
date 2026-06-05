export function weapons() {
  const ped = PlayerPedId();

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
    GiveWeaponToPed(ped, gun, 99999, false, false);
  });
}
