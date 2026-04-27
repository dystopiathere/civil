export function setFocus(focus: boolean, cursor: boolean, input: boolean) {
  SetNuiFocus(focus, cursor);
  SetNuiFocusKeepInput(input);
}
