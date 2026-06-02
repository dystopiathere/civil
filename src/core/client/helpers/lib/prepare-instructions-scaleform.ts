import { InstructionButtonData } from "../types";
import { delay } from "./delay";

export async function prepareInstructionsScaleform(
  instructions: InstructionButtonData | InstructionButtonData[],
): Promise<number> {
  const scaleform = RequestScaleformMovie("instructional_buttons");

  while (!HasScaleformMovieLoaded(scaleform)) {
    await delay(100);
  }

  let resInstructions = instructions;

  PushScaleformMovieFunction(scaleform, "CLEAR_ALL");
  PopScaleformMovieFunctionVoid();

  if (!Array.isArray(resInstructions)) {
    resInstructions = [resInstructions];
  }

  resInstructions.forEach(({ text, button }, key) => {
    PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT");
    PushScaleformMovieMethodParameterInt(key);
    if (button) {
      PushScaleformMovieMethodParameterString(button);
    }
    PushScaleformMovieMethodParameterString(text);
    PopScaleformMovieFunctionVoid();
  });

  PushScaleformMovieFunction(scaleform, "DRAW_INSTRUCTIONAL_BUTTONS");
  PopScaleformMovieFunctionVoid();

  return scaleform;
}
