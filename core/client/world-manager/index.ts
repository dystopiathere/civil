import { collectPedPosition, placeMarkers, toggleAmbientSounds, toggleEntityDensity } from "./lib";

collectPedPosition();
placeMarkers();

SetArtificialLightsState(true);
toggleEntityDensity(false);
toggleAmbientSounds(false);
