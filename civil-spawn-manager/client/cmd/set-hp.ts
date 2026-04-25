RegisterCommand(
  "hp",
  async (source: number, args: string[], raw: string) => {
    (global.LocalPlayer as LocalPlayerInterface).state.set("health", Number(args[0]), true);
  },
  false
);

export {};
