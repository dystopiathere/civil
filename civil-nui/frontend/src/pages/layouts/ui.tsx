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

    const paddingLeft = (1 - safeZone) * 100;
    const paddingRight = (1 - safeZone) * 100;
    const paddingTop = (1 - safeZone) * 50;
    const paddingBottom = (1 - safeZone) * 50;

    hudRef.current.style.paddingLeft = `${paddingLeft}px`;
    hudRef.current.style.paddingRight = `${paddingRight}px`;
    hudRef.current.style.paddingTop = `${paddingTop}px`;
    hudRef.current.style.paddingBottom = `${paddingBottom}px`;
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
