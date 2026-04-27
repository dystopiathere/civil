export function toggleAmbientSounds(state: boolean) {
  if (!state) {
    StartAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE");
    StartAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE");
    StartAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");
  } else {
    StopAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE");
    StopAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE");
    StopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");
  }

  SetAudioFlag("AmbientZoneDisabled", !state);
  SetAudioFlag("PoliceScannerDisabled", !state);
  SetAudioFlag("DisableFlightMusic", !state);
  SetAudioFlag("DisableBarks", !state);
  SetAudioFlag("WantedMusicDisabled", !state);

  SetAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Disabled_Zones", state, true);
  SetAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Zones", !state, true);

  SetStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_01_STAGE", state);
  SetStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_02_MAIN_ROOM", state);
  SetStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_03_BACK_ROOM", state);

  SetScenarioTypeEnabled("WORLD_VEHICLE_STREETRACE", state);
  SetScenarioTypeEnabled("WORLD_VEHICLE_SALTON_DIRT_BIKE", state);
  SetScenarioTypeEnabled("WORLD_VEHICLE_SALTON", state);
  SetScenarioTypeEnabled("WORLD_VEHICLE_POLICE_NEXT_TO_CAR", state);
  SetScenarioTypeEnabled("WORLD_VEHICLE_POLICE_CAR", state);
  SetScenarioTypeEnabled("WORLD_VEHICLE_POLICE_BIKE", state);
  SetScenarioTypeEnabled("WORLD_VEHICLE_MILITARY_PLANES_SMALL", state);
  SetScenarioTypeEnabled("WORLD_VEHICLE_MILITARY_PLANES_BIG", state);
  SetScenarioTypeEnabled("WORLD_VEHICLE_MECHANIC", state);
  SetScenarioTypeEnabled("WORLD_VEHICLE_EMPTY", state);
  SetScenarioTypeEnabled("WORLD_VEHICLE_BUSINESSMEN", state);
  SetScenarioTypeEnabled("WORLD_VEHICLE_BIKE_OFF_ROAD_RACE", state);

  SetRandomEventFlag(state);

  DistantCopCarSirens(state);
}
