import { onEntityDamage, onPlayerSpawned } from "../events";

export function registerEvents() {
  on("gameEventTriggered", (name: string, args: any[]) => {
    // console.log(`game event triggered: ${name}, args: ${args.join(", ")}`);

    if (name === "CEventNetworkEntityDamage") {
      onEntityDamage(args);
    }
  });

  on("playerSpawned", onPlayerSpawned);
}
