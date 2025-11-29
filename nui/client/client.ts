import './events'
import './messages'

on('onClientGameTypeStart', async () => {
  setTick(() => {
    [1, 2, 3, 4, 6, 7, 8, 9, 13, 20].forEach((el) => {
      HideHudComponentThisFrame(el)
    })
  })
})