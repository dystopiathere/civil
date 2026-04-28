import { pages } from "../configs";
import { setFocus } from "./set-focus";
import { navigate } from "../messages";

let pageCamera: number | null;

export function openPage(page: string) {
  const { focus, cursor, input, freeze, setupCamera } = pages[page];

  navigate(page);
  setFocus(focus, cursor, input);

  emit("models:freeze", freeze);

  if (!setupCamera) {
    if (pageCamera && DoesCamExist(pageCamera)) {
      DestroyCam(pageCamera, true);
      RenderScriptCams(false, true, 500, true, true);
      pageCamera = null;
    }

    return;
  }

  const cam = setupCamera();

  if (pageCamera) {
    SetCamActiveWithInterp(cam, pageCamera, 300, 1, 1);
  } else {
    RenderScriptCams(true, true, 500, true, true);
  }

  if (pageCamera) {
    DestroyCam(pageCamera, true);
  }

  pageCamera = cam;
}
