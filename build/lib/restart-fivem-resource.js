import dgram from "dgram";
import { production } from "../constants.js";
import { RCON_CONFIG } from "../configs/index.js";

const restartTimers = {};

function sendFiveMRconCommand(command) {
  return new Promise((resolve, reject) => {
    const client = dgram.createSocket("udp4");

    const packetStr = `\xFF\xFF\xFF\xFFrcon ${RCON_CONFIG.password} ${command}\n`;
    const message = Buffer.from(packetStr, "binary");

    client.send(message, 0, message.length, RCON_CONFIG.port, RCON_CONFIG.host, (err) => {
      client.close();
      if (err) {
        return reject(err);
      }
      resolve();
    });
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
    try {
      const targetResourceName = resourceName.replaceAll("-", "_");

      await sendFiveMRconCommand("refresh");
      await sendFiveMRconCommand(`restart ${targetResourceName}`);

      console.log(`\x1b[35m[FiveM RCON]: Ресурс ${targetResourceName} успешно перезапущен на сервере!\x1b[0m`);
    } catch (err) {
      console.error(
        `\x1b[31m[FiveM RCON]: Не удалось перезапустить ${resourceName}. Проверьте rcon_password в server.cfg или запущен ли сервер.\x1b[0m`,
      );
    }
  }, 300);
}
