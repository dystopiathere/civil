import dgram from "dgram";
import { production } from "../constants.js";
import { RCON_CONFIG } from "../configs/index.js";

const restartTimers = {};

function sendFiveMRconCommand(command) {
  const client = dgram.createSocket("udp4");

  const prefix = Buffer.from([0xff, 0xff, 0xff, 0xff]);
  const rconString = `rcon "${RCON_CONFIG.password}" ${command}\n`;
  const payload = Buffer.concat([prefix, Buffer.from(rconString, "utf8")]);

  client.on("message", (msg) => {
    const cleanResponse = msg.slice(4).toString("utf8");
    console.log("[RCON] Server Response:\n", cleanResponse);
    client.close();
  });

  client.on("error", (err) => {
    console.error("[RCON] Socket error:", err);
    client.close();
  });

  client.send(payload, 0, payload.length, RCON_CONFIG.port, RCON_CONFIG.host, (err) => {
    if (err) {
      console.error("[RCON] Failed to send packet:", err);
      client.close();
    }
  });
}

export async function restartFiveMResource(resourceName) {
  if (production) {
    return;
  }

  if (restartTimers[resourceName]) {
    clearTimeout(restartTimers[resourceName]);
  }

  restartTimers[resourceName] = setTimeout(async () => {
    const targetResourceName = resourceName.replaceAll("-", "_");

    sendFiveMRconCommand("refresh");
    sendFiveMRconCommand(`restart ${targetResourceName}`);

    console.log(`[RCON]: Resource "${targetResourceName}" was reloaded`);
  }, 300);
}
