import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CharacterState } from "@civil/types";
import { type MessageEventData, pathKeys } from "~/shared/lib";
import { useCharacterStore, useWorldStore, type World } from "~/entities";

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
          const { health } = data as Pick<CharacterState, "health">;

          setPlayerHealth(health > 0 ? health : 0);
          break;
        case "setPlayerArmour":
          const { armour } = data as Pick<CharacterState, "armour">;

          setPlayerArmour(armour);
          break;
        case "setPlayerMaxHealth":
          const { maxHealth } = data as Pick<CharacterState, "maxHealth">;

          setPlayerMaxHealth(maxHealth);
          break;
        case "setPlayerMaxArmour":
          const { maxArmour } = data as Pick<CharacterState, "maxArmour">;

          setPlayerMaxArmour(maxArmour);
          break;
        case "setPlayerUnderwater":
          const { breath, isInWater } = data as Pick<CharacterState, "breath" | "isInWater">;

          setPlayerBreath(breath > 0 ? breath : 0);
          setPlayerInWater(isInWater);
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
