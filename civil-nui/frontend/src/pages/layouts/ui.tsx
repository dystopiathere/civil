import { Outlet } from "react-router-dom";
import { PlayerStats } from "~/widgets/player-stats";
import { WorldData } from "~/widgets/world-data";
import { useKeyboardEvents, useMessages } from "~/shared/hooks";
import "./styles.scss";

export function HUDLayout() {
  useMessages();
  useKeyboardEvents();

  return (
    <div className="hud">
      <div className="container">
        <PlayerStats />
        <WorldData />

        <Outlet />
      </div>
    </div>
  );
}
