export function blackout(source: number, args: number[], raw: string) {
  GlobalState.state.set("blackout", !GlobalState.state.blackout, true);

  SetArtificialLightsState(GlobalState.state.blackout);
}
