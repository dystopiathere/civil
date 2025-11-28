import { TabsNavigation } from '~/widgets/tabs-navigation'
import { characterCreatorPages } from './config'
import { Outlet } from 'react-router-dom'
import './styles.scss'

export function CharacterCreator () {
  return <div className="character-creator">
    <TabsNavigation pages={characterCreatorPages}/>

    <Outlet/>
  </div>
}