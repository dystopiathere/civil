import { PlayerHealth, PlayerArmour, PlayerBreath } from "~/shared/ui";
import { useCharacterStore } from "~/entities";
import "./styles.scss";

export function PlayerStats() {
  const { health, maxHealth, armour, maxArmour, breath, isInWater } = useCharacterStore();

  return (
    <div className="player-stats">
      <div className="player-stats-group">
        <PlayerHealth health={health!} maxHealth={maxHealth!} />
        <PlayerArmour armour={armour!} maxArmour={maxArmour!} />
        {isInWater && <PlayerBreath breath={breath!} />}
      </div>
    </div>
  );
}
