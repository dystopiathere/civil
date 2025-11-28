import { zonesMapping } from './config'
import { FullCharacterEntity } from 'civil'

const exports = global.exports as CitizenExports

const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

on('onClientGameTypeStart', () => {
  setInterval(() => {
    const playerPed = GetPlayerPed(-1)

    const [x, y, z] = GetEntityCoords(playerPed, false) as [number, number, number]
    const heading = GetEntityHeading(playerPed)

    const [streetNameHash] = GetStreetNameAtCoord(x, y, z)
    const streetName = GetStreetNameFromHashKey(streetNameHash)
    const zoneName = GetNameOfZone(x, y, z)

    const { character } = LocalPlayer.state

    Object.assign(character, { last_position: { x, y, z, heading } })

    LocalPlayer.state.set('character', character, true)

    const hours = GetClockHours().toString().padStart(2, '0')
    const minutes = GetClockMinutes().toString().padStart(2, '0')

    const time = `${hours}:${minutes}`

    exports.nui.sendWorldData({ streetName, zoneName: zonesMapping[zoneName] ?? zoneName, time })
  }, 100)
})