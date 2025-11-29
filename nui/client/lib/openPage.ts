import { NuiPage } from 'civil'
import { pages } from '../config'
import { setFocus } from './setFocus'
import { navigate } from '../messages'

let pageCamera: number

export function openPage (page: NuiPage) {
  if (pageCamera) {
    if (DoesCamExist(pageCamera)) {
      DestroyCam(pageCamera, true)
    }

    RenderScriptCams(false, true, 500, true, true)

    pageCamera = null
  }

  const { focus, cursor, input, setupCamera } = pages[page]

  navigate(page)
  setFocus(focus, cursor, input)

  if (!setupCamera) {
    return
  }

  pageCamera = setupCamera()
  RenderScriptCams(true, true, 500, true, true)
}