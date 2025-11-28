import { Outlet } from 'react-router-dom'
import { PlayerStats } from '~/widgets/player-stats'
import { WorldData } from '~/widgets/world-data'
import { useMessages } from '~/shared/hooks'
import './styles.scss'

export function HUDLayout () {
  useMessages()

  return <div className="hud">
    <PlayerStats/>
    <WorldData/>

    <Outlet/>
  </div>
}