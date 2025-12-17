let blackout = false;

RegisterCommand(
  "blackout",
  async (source: number, args: number[], raw: string) => {
    blackout = !blackout;

    SetArtificialLightsState(blackout);
  },
  false
);

export {};
