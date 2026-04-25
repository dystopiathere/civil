const exports = global.exports as CitizenExports;

let tick: number | undefined;
let interval: NodeJS.Timeout | undefined;

RegisterCommand(
  "test",
  async (source: number, args: string[], raw: string) => {
    if (tick) {
      clearTick(tick);
      tick = undefined;
    }
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    console.log(GetSafeZoneSize());
  },
  false,
);

export {};
