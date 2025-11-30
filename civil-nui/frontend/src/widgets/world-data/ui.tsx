import { useWorldStore } from '~/entities/world'
import './styles.scss'

export function WorldData () {
  const { zoneName, streetName, time } = useWorldStore()

  return <div className="world-data">
    <div className="world-data-time">{time}</div>

    <div className="world-data-area">
      <div className="world-data-area__zone">{zoneName}</div>
      <div className="world-data-area__street">{streetName}</div>
    </div>
  </div>
}