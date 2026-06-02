import fs from "node:fs";
import path from "node:path";
import { copyFolderSync } from "./index.js";

export function syncStaticAssets(resourceName, resourcePath, targetPath, frontendExists) {
  try {
    const manifestSrc = `${resourcePath}/fxmanifest.lua`;
    if (fs.existsSync(manifestSrc)) {
      fs.mkdirSync(targetPath, { recursive: true });
      fs.copyFileSync(manifestSrc, `${targetPath}/fxmanifest.lua`);
    }

    if (frontendExists) {
      const frontendSrc = `${resourcePath}/frontend/dist`;
      const frontendTarget = `${targetPath}/dist`;

      if (fs.existsSync(frontendSrc)) {
        if (fs.existsSync(frontendTarget)) {
          const oldFiles = fs.readdirSync(frontendTarget);
          oldFiles.forEach((file) => {
            if (!["client.js", "server.js", "client.js.map", "server.js.map"].includes(file)) {
              fs.rmSync(path.join(frontendTarget, file), { recursive: true, force: true });
            }
          });
        }
        copyFolderSync(frontendSrc, frontendTarget);
      }
    }
  } catch (err) {
    console.error(`[${resourceName}]: Ошибка копирования ассетов:`, err.message);
  }
}
