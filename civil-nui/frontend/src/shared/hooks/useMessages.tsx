import { useEffect } from 'react'
import { type MessageEventData } from '~/shared/lib/event-manager'
import { type Player, usePlayerStore } from '~/entities/player'
import { useWorldStore, type World } from '~/entities/world'
import { type Character, useCharacterStore } from '~/entities/character'
import { pathKeys } from '~/shared/lib/react-router'
import { useNavigate } from 'react-router-dom'

export function useMessages () {
  const {
    setPlayerHealth,
    setPlayerArmour,
    setPlayerBreath,
    setPlayerInWater,
  } = usePlayerStore()

  const {
    setStreetName,
    setZoneName,
    setTime
  } = useWorldStore()

  const {
    setHeadBlends,
    setComponentVariations,
    setHeadOverlays,
    setSkills,
    setFaceFeatures
  } = useCharacterStore()

  const navigate = useNavigate()

  useEffect(() => {
    window.onmessage = (event: MessageEvent<MessageEventData>) => {
      const { name, data } = event.data

      if (name === 'setPlayerStats') {
        const { health, maxHealth, armour, maxArmour } = data as Player

        const resultHealth = health > 0 ? health : 0

        setPlayerHealth({
          health: resultHealth,
          maxHealth: maxHealth,
        })
        setPlayerArmour({
          armour: armour,
          maxArmour: maxArmour,
        })
      }

      if (event.data.name === 'setPlayerUnderwater') {
        const { breath, isInWater } = data as Player

        const resultBreath = breath > 0 ? breath : 0

        setPlayerBreath({ breath: resultBreath })
        setPlayerInWater({ isInWater })
      }

      if (name === 'setWorldData') {
        const { streetName, zoneName, time } = data as World

        setStreetName(streetName)
        setZoneName(zoneName)
        setTime(time)
      }

      if (name === 'setCharacterData') {
        const { head_overlays, head_blends, component_variations, skills, face_features } = data as Character

        setHeadBlends(head_blends)
        setHeadOverlays(head_overlays)
        setComponentVariations(component_variations)
        setSkills(skills)
        setFaceFeatures(face_features)
      }

      if (name === 'navigate') {
        const { page } = data as { page: keyof object }

        const getPath = pathKeys[page] as CallableFunction

        if (getPath) {
          navigate(getPath())
        }
      }
    }

    return () => {
      window.onmessage = null
    }
  }, [navigate, setComponentVariations, setFaceFeatures, setHeadBlends, setHeadOverlays, setPlayerArmour, setPlayerBreath, setPlayerHealth, setPlayerInWater, setSkills, setStreetName, setTime, setZoneName])
}