import "./cmd";

// @ts-ignore
const exports = global.exports as CivilExports;

async function spawnPlayer() {
  const { model, last_position } = global.LocalPlayer.state;

  if (!IsModelInCdimage(model) || !IsModelAPed(model)) {
    console.log(`Bad model: ${model}`);
  }

  RequestModel(model);
  while (!HasModelLoaded(model)) {
    await exports.civil_helpers.delay(500);
  }

  exports.spawnmanager.spawnPlayer({
    x: last_position?.x ?? 410.213,
    y: last_position?.y ?? -963.708,
    z: last_position?.z ?? 28.651,
    heading: last_position?.heading ?? undefined,
    model: model,
    skipFade: true,
  });

  SetModelAsNoLongerNeeded(model);
}

on("onClientGameTypeStart", async () => {
  await spawnPlayer();
});

on("playerSpawned", () => {
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
});
