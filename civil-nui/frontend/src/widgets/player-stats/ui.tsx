import { PlayerHealth } from '~/shared/ui/player-health'
import { PlayerArmour } from '~/shared/ui/player-armour'
import { PlayerBreath } from '~/shared/ui/player-breath'
import { usePlayerStore } from '~/entities/player'
import './styles.scss'

export function PlayerStats () {
  const {
    health,
    maxHealth,
    armour,
    maxArmour,
    breath,
    isInWater,
  } = usePlayerStore()

  return <div className="player-stats">
    <div className="player-stats-group">
      <PlayerHealth health={health} maxHealth={maxHealth}/>
      <PlayerArmour armour={armour} maxArmour={maxArmour}/>
    </div>

    {isInWater && <PlayerBreath breath={breath}/>}
  </div>
}