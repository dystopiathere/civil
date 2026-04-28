import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FullCharacterEntity } from "types/civil";
import { type MessageEventData, pathKeys } from "~/shared/lib";
import { useCharacterStore, useWorldStore, type AdditionalCharacterData, type World } from "~/entities";

export function useMessages() {
  const [safeZone, setSafeZone] = useState<number>(0.85);

  const {
    setPlayerHealth,
    setPlayerMaxHealth,
    setPlayerArmour,
    setPlayerMaxArmour,
    setPlayerBreath,
    setPlayerInWater,
  } = useCharacterStore();

  const { setStreetName, setZoneName, setTime } = useWorldStore();

  const navigate = useNavigate();

  useEffect(() => {
    window.onmessage = (event: MessageEvent<MessageEventData>) => {
      const { name, data } = event.data;

      switch (name) {
        case "setPlayerHealth":
          const { health } = data as Pick<FullCharacterEntity, "health">;

          setPlayerHealth(health > 0 ? health : 0);
          break;
        case "setPlayerArmour":
          const { armour } = data as Pick<FullCharacterEntity, "armour">;

          setPlayerArmour(armour);
          break;
        case "setPlayerMaxHealth":
          const { max_health } = data as Pick<FullCharacterEntity, "max_health">;

          setPlayerMaxHealth(max_health);
          break;
        case "setPlayerMaxArmour":
          const { max_armour } = data as Pick<FullCharacterEntity, "max_armour">;

          setPlayerMaxArmour(max_armour);
          break;
        case "setPlayerUnderwater":
          const { breath, is_in_water } = data as Pick<AdditionalCharacterData, "breath" | "is_in_water">;

          setPlayerBreath(breath > 0 ? breath : 0);
          setPlayerInWater(is_in_water);
          break;
        case "setWorldData":
          const { streetName, zoneName, time } = data as World;

          setStreetName(streetName);
          setZoneName(zoneName);
          setTime(time);
          break;
        case "navigate":
          const { page } = data as { page: keyof object };

          const getPath = pathKeys[page] as CallableFunction;

          if (getPath) {
            navigate(getPath());
          }
          break;
        case "setSafeZone":
          const { safeZone: sz } = data as { safeZone: number };

          setSafeZone(sz);
          break;
        default:
          console.error("unhandled message", name);
          break;
      }
    };

    return () => {
      window.onmessage = null;
    };
  }, [
    navigate,
    setPlayerArmour,
    setPlayerBreath,
    setPlayerHealth,
    setPlayerInWater,
    setPlayerMaxArmour,
    setPlayerMaxHealth,
    setStreetName,
    setTime,
    setZoneName,
  ]);

  return { safeZone };
}
