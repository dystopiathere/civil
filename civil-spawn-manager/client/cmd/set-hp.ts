RegisterCommand(
  "hp",
  async (source: number, args: string[], raw: string) => {
    global.LocalPlayer.state.set("health", Number(args[0]), true);
  },
  false
);
