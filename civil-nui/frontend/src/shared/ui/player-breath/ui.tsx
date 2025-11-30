import { LungIcon } from '~/shared/ui/lung-icon'

type PlayerBreathProps = {
  breath: number;
}

const breathColor = '#0BB88DFF'

export function PlayerBreath ({ breath }: PlayerBreathProps) {
  return <div className="player-stats-element player-breath">
    <LungIcon width={32} height={32} color={breathColor}/>

    <div className="player-stats-element-value">
      <div className="player-stats-element-value__numeric">
        {Math.round(breath)}s
      </div>
    </div>
  </div>
}