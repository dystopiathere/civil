import { useEffect, useState } from "react";
import { type MessageEventData } from "~/shared/lib/event-manager";
import { type Player, usePlayerStore } from "~/entities/player";
import { useWorldStore, type World } from "~/entities/world";
import { pathKeys } from "~/shared/lib/react-router";
import { useNavigate } from "react-router-dom";

export function useMessages() {
  const [safeZone, setSafeZone] = useState<number>(1);

  const {
    setPlayerHealth,
    setPlayerMaxHealth,
    setPlayerArmour,
    setPlayerMaxArmour,
    setPlayerBreath,
    setPlayerInWater,
  } = usePlayerStore();

  const { setStreetName, setZoneName, setTime } = useWorldStore();

  const navigate = useNavigate();

  useEffect(() => {
    window.onmessage = (event: MessageEvent<MessageEventData>) => {
      const { name, data } = event.data;

      if (name === "setPlayerHealth") {
        const { health } = data as Pick<Player, "health">;

        setPlayerHealth(health > 0 ? health : 0);
      }

      if (name === "setPlayerArmour") {
        const { armour } = data as Pick<Player, "armour">;

        setPlayerArmour(armour);
      }

      if (name === "setPlayerMaxHealth") {
        const { maxHealth } = data as Pick<Player, "maxHealth">;

        setPlayerMaxHealth(maxHealth);
      }

      if (name === "setPlayerMaxArmour") {
        const { maxArmour } = data as Pick<Player, "maxArmour">;

        setPlayerMaxArmour(maxArmour);
      }

      if (event.data.name === "setPlayerUnderwater") {
        const { breath, isInWater } = data as Pick<Player, "breath" | "isInWater">;

        setPlayerBreath(breath > 0 ? breath : 0);
        setPlayerInWater(isInWater);
      }

      if (name === "setWorldData") {
        const { streetName, zoneName, time } = data as World;

        setStreetName(streetName);
        setZoneName(zoneName);
        setTime(time);
      }

      if (name === "navigate") {
        const { page } = data as { page: keyof object };

        const getPath = pathKeys[page] as CallableFunction;

        if (getPath) {
          navigate(getPath());
        }
      }

      if (name === "setSafeZone") {
        const { safeZone: sz } = data as { safeZone: number };

        setSafeZone(sz);
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
