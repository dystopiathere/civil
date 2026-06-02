import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { build } from "esbuild";
import { production } from "./constants.js";
import { CLIENT_CONFIG, SERVER_CONFIG, BANNER_CONFIG } from "./configs/index.js";
import { syncStaticAssets, onRebuild, restartFiveMResource } from "./lib/index.js";

const resources = {};
const modules = ["db", "core", "nui", "map"];
const files = fs.readdirSync("./src");

files.forEach((file) => {
  if (modules.includes(file)) {
    const clientExists = fs.existsSync(`./src/${file}/client`);
    const serverExists = fs.existsSync(`./src/${file}/server`);
    const frontendExists = fs.existsSync(`./src/${file}/frontend`);
    resources[file] = { clientExists, serverExists, frontendExists };
  }
});

Object.entries(resources).forEach(([resourceName, { clientExists, serverExists, frontendExists }]) => {
  const contexts = {};

  if (clientExists) {
    contexts.client = CLIENT_CONFIG;
  }

  if (serverExists) {
    contexts.server = SERVER_CONFIG;
  }

  const resourcePath = `./src/${resourceName}`;
  const targetResourceName = resourceName.replaceAll("-", "_");
  const targetPath = `./resources/[main]/${targetResourceName}`;

  syncStaticAssets(resourceName, resourcePath, targetPath, frontendExists);

  Object.entries(contexts).forEach(([context, data]) => {
    build({
      bundle: true,
      sourcemap: true,
      keepNames: true,
      outfile: `${targetPath}/dist/${context}.js`,
      entryPoints: [`${resourcePath}/${context}/index.ts`],
      watch: production
        ? false
        : { onRebuild: onRebuild(resourceName, context, resourcePath, targetPath, frontendExists) },
      banner: resourceName === "db" ? BANNER_CONFIG : undefined,
      ...data,
    })
      .then(() => {
        console.log(`[${resourceName}:${context}]: Built successfully!`);
      })
      .catch(() => process.exit(1));
  });

  if (!production) {
    const pathsToWatch = [];

    const manifestPath = path.resolve(`${resourcePath}/fxmanifest.lua`);
    if (fs.existsSync(manifestPath)) {
      pathsToWatch.push(manifestPath);
    }

    if (frontendExists) {
      const markerPath = path.resolve(`${resourcePath}/frontend/.vite-build-done`);
      pathsToWatch.push(markerPath);
    }

    if (pathsToWatch.length > 0) {
      const watcher = chokidar.watch(pathsToWatch, {
        persistent: true,
        ignoreInitial: true,
      });

      watcher.on("all", (event, changedPath) => {
        const triggerFiles = [];

        const isManifest = changedPath.endsWith("fxmanifest.lua");

        console.log(
          `\x1b[36m[Watcher]: Обнаружено изменение в ресурсе ${resourceName} (${isManifest ? "манифест" : "фронтенд"}). Синхронизация...\x1b[0m`,
        );

        syncStaticAssets(resourceName, resourcePath, targetPath, !isManifest);
        restartFiveMResource(resourceName);
      });

      process.on("SIGINT", () => watcher.close());
    }
  }
});
