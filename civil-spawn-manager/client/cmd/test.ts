RegisterCommand(
  "test",
  async (source: number, args: string[], raw: string) => {
    const model = "g_m_y_ballasout_01";

    const ped = GetPlayerPed(-1);
    const [x, y, z] = GetOffsetFromEntityInWorldCoords(ped, 0, 5, 0);

    RequestModel(model);
    while (!HasModelLoaded(model)) {
      await global.exports.civil_helpers.delay(100);
    }

    const enemy = CreatePed(4, model, x, y, z, GetEntityHeading(ped) - 180, true, false);

    GiveWeaponToPed(enemy, "WEAPON_PISTOL", 999, false, true);
    SetCurrentPedWeapon(enemy, "WEAPON_PISTOL", true);

    // SetPedRelationshipGroupHash(enemy, "HATES_PLAYER");
    SetEntityMaxHealth(enemy, 200);
    SetEntityHealth(enemy, 200);

    SetPedCombatAttributes(enemy, 46, true);
    SetPedCombatAttributes(enemy, 5, true);
    SetPedCombatAbility(enemy, 100);
    SetPedCombatRange(enemy, 2);

    TaskCombatPed(enemy, ped, 0, 16);
  },
  false,
);

export {};
