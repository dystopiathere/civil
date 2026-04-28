import { PlayerHealth, PlayerArmour, PlayerBreath } from "~/shared/ui";
import { useCharacterStore } from "~/entities";
import "./styles.scss";

export function PlayerStats() {
  const { health, max_health, armour, max_armour, breath, is_in_water } = useCharacterStore();

  return (
    <div className="player-stats">
      <div className="player-stats-group">
        <PlayerHealth health={health!} maxHealth={max_health!} />
        <PlayerArmour armour={armour!} maxArmour={max_armour!} />
        {is_in_water && <PlayerBreath breath={breath!} />}
      </div>
    </div>
  );
}
