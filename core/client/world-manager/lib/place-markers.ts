import { drawText3D, prepareInstructionsScaleform } from "~/helpers";
import { clothesShops, MARKER_SHOW_DISTANCE, markerSizes } from "../configs";

const markers = [...clothesShops];

export async function placeMarkers() {
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

    const sc = await prepareInstructionsScaleform({
      text: helpText,
      button: GetControlInstructionalButton(0, 51, true),
    });

    helpInstructions.set(helpText, sc);
  }

  setTick(async () => {
    const ped = GetPlayerPed(-1);
    const [pedX, pedY, pedZ] = GetEntityCoords(ped, false);

    markers.forEach(({ type, coords, size, color, action, label, helpText }) => {
      const distance = Vdist2(pedX, pedY, pedZ, coords.x, coords.y, coords.z - 1);

      if (distance > MARKER_SHOW_DISTANCE) {
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
        markerSizes[size].x,
        markerSizes[size].y,
        markerSizes[size].z,
        color.red,
        color.green,
        color.blue,
        color.alpha,
        false,
        true,
        2,
        false,
        // @ts-ignore
        null,
        null,
        false,
      );

      if (label) {
        drawText3D(coords.x, coords.y, coords.z, label);
      }

      if (distance < markerSizes[size].x) {
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
}
