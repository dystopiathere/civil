import { NuiPage } from "civil";
import { pages } from "../config";
import { setFocus } from "./setFocus";
import { navigate } from "../messages";

let pageCamera: number;

export function openPage(page: NuiPage) {
  const { focus, cursor, input, setupCamera } = pages[page];

  navigate(page);
  setFocus(focus, cursor, input);

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
