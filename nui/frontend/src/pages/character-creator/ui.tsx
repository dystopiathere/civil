import { Outlet } from "react-router-dom";
import { TabsNavigation } from "~/widgets";
import { characterCreatorPages } from "./config";
import "./styles.scss";

export function CharacterCreator() {
  return (
    <div className="character-creator">
      <TabsNavigation pages={characterCreatorPages} />

      <Outlet />
    </div>
  );
}
