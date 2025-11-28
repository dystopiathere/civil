import './events'
import './messages'
import { delay } from './utils'

on('onClientGameTypeStart', async () => {
  const minimap = RequestScaleformMovie('minimap')

  while (!HasScaleformMovieLoaded(minimap)) {
    await delay(500)
  }

  SetRadarBigmapEnabled(true, false)
  SetRadarBigmapEnabled(false, false)

  setTick(() => {
    [1, 2, 3, 4, 6, 7, 8, 9, 13, 20].forEach((el) => {
      HideHudComponentThisFrame(el)
    })

    BeginScaleformMovieMethod(minimap, 'SETUP_HEALTH_ARMOUR')
    ScaleformMovieMethodAddParamInt(3)
    EndScaleformMovieMethod()
  })
})