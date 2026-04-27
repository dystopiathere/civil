import { clothesShops } from "./configs";

let markersTick: number | undefined;

const sizes: Record<"small" | "medium" | "large", { x: number; y: number; z: number }> = {
  small: { x: 1.0, y: 1.0, z: 0.5 },
  medium: { x: 2.0, y: 2.0, z: 0.5 },
  large: { x: 3.0, y: 3.0, z: 0.5 },
};

const SHOW_DISTANCE = 100.0;

const markers = [...clothesShops];

export async function placeMarkers() {
  if (markersTick) {
    clearTick(markersTick);
  }

  const helpInstructions = new Map<string, number>();
  let activeInstruction: string | null = null;

  for (const { blip, coords, helpText } of markers) {
    if (blip) {
      const blipId = AddBlipForCoord(coords.x, coords.y, coords.z);
      SetBlipSprite(blipId, blip.sprite);

      SetBlipAsShortRange(blipId, blip.shortRange);
    }

    if (!helpText || helpInstructions.has(helpText)) {
      continue;
    }

    const sc = await global.exports.civil_helpers.prepareInstructionsScaleform({
      text: helpText,
      button: GetControlInstructionalButton(0, 51, true),
    });

    helpInstructions.set(helpText, sc);
  }

  markersTick = setTick(async () => {
    const ped = GetPlayerPed(-1);
    const [pedX, pedY, pedZ] = GetEntityCoords(ped, false);

    markers.forEach(({ type, coords, size, color, action, label, helpText }) => {
      const distance = Vdist2(pedX, pedY, pedZ, coords.x, coords.y, coords.z - 1);

      if (distance > SHOW_DISTANCE) {
        return;
      }

      DrawMarker(
        type,
        coords.x,
        coords.y,
        coords.z - 1,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        sizes[size].x,
        sizes[size].y,
        sizes[size].z,
        color.red,
        color.green,
        color.blue,
        color.alpha,
        false,
        true,
        2,
        false,
        null,
        null,
        false,
      );

      if (label) {
        global.exports.civil_helpers.drawText3D(coords.x, coords.y, coords.z, label);
      }

      if (distance < sizes[size].x) {
        if (helpText && helpInstructions.has(helpText)) {
          const sc = helpInstructions.get(helpText) as number;

          if (activeInstruction !== helpText) {
            activeInstruction = helpText;
            PlaySoundFrontend(-1, "On_Call_Player_Join", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true);
          }

          DrawScaleformMovieFullscreen(sc, 255, 255, 255, 255, 0);
        }

        if (IsControlJustReleased(0, 51)) {
          action();
        }
      } else {
        activeInstruction = null;
      }
    });
  });

  return markersTick;
}
