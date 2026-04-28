import { delay } from "~/helpers";

export async function car(source: number, args: string[], raw: string) {
  let model = "bati";

  if (args.length > 0) {
    model = args[0].toString();
  }

  if (!IsModelInCdimage(model) || !IsModelAVehicle(model)) {
    console.error(`Bad vehicle: ${model}`);
    return;
  }

  RequestModel(model);
  while (!HasModelLoaded(model)) {
    await delay(500);
  }

  const ped = GetPlayerPed(-1);
  const coords = GetEntityCoords(ped, true);
  const vehicle = CreateVehicle(model, coords[0], coords[1], coords[2], GetEntityHeading(ped), true, false);

  SetPedIntoVehicle(ped, vehicle, -1);

  const oldVeh = Entity(ped).state.currentVeh;

  if (oldVeh) {
    DeleteVehicle(oldVeh);
    SetEntityAsNoLongerNeeded(oldVeh);
  }

  Entity(ped).state.set("currentVeh", vehicle, false);

  SetModelAsNoLongerNeeded(model);
}
