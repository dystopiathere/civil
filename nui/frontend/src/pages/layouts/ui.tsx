import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { PlayerStats } from "~/widgets/player-stats";
import { WorldData } from "~/widgets/world-data";
import { useKeyboardEvents, useMessages } from "~/shared/hooks";
import "./styles.scss";

export function HUDLayout() {
  useKeyboardEvents();
  const { safeZone } = useMessages();

  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hudRef.current) {
      return;
    }

    const paddingOffset = (1 - safeZone) * 50;

    hudRef.current.style.padding = `${paddingOffset / 1.8}% ${paddingOffset}%`;
  }, [safeZone]);

  return (
    <div className="hud" ref={hudRef}>
      <div className="container">
        <PlayerStats />
        <WorldData />

        <Outlet />
      </div>
    </div>
  );
}
