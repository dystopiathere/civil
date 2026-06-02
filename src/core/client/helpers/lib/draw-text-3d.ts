export function drawText3D(x: number, y: number, z: number, text: string) {
  const [onScreen, screenX, screenY] = World3dToScreen2d(x, y, z);

  SetTextScale(0.35, 0.35);
  SetTextFont(4);
  SetTextProportional(true);
  SetTextColour(255, 255, 255, 255);
  SetTextEntry("STRING");
  SetTextCentre(true);
  AddTextComponentString(text);
  DrawText(screenX, screenY);
}
